const fs = require('fs');
const logger = require('pino')();
const utils = require('./utils');
const fetch = require('node-fetch');
const config = require('./config');
var async = require("async");

let apiServiceRoutes;

const init = function() {
    console.log("init run");
    apiServiceRoutes = JSON.parse(fs.readFileSync(__dirname + '/../api.json', 'utf8'));
    console.log("init done");
    console.log(apiServiceRoutes);
}

const validateReqParam = function(req, serviceMapAction, type) {
    let reqParam = req.body;
    let paramType = type;

    if (reqParam && paramType) {
        let paramValid = true;
        const requiredParams = serviceMapAction.param
            .filter(p => {
                return p.paramType === paramType;
            })
            .filter(p => p.required)
            .map(p => p); 
        
        if (requiredParams) {
            for (const p of requiredParams) {
                if (p.name in reqParam) {
                    paramValid = true;
                } else {
                    paramValid = false;
                }
                if (typeof reqParam[p.name] === p.type) {
                    if (p.type === "boolean") {
                        if (reqParam[p.name] === "true" || reqParam[p.name] === 1 
                        || reqParam[p.name] === true || reqParam[p.name] === "false" 
                        || reqParam[p.name] === 0 || reqParam[p.name] === false) {
                            paramValid = true;
                        } else {
                            paramValid = false;
                        }
                    } else {
                        paramValid = true;
                    }
                } else {
                    paramValid = false;
                }
                
            }
        }
        return paramValid;
    }
    return false;
}

const identifyServiceUrl = function(serviceTarget) {
    switch (serviceTarget.toLowerCase()) {
        case "user-service":
            return config.userServiceUrl;
        break;
        case "chat-service":
            return config.chatServiceUrl;
        break;
        case "quest-service":
            return config.questServiceUrl;
        break;
        case "review-service":
            return config.reviewServiceUrl;
        break;
        case "reward-service":
            return config.rewardServiceUrl;
        break;
        default:
            return "";
        break;
    }
    
}

const constructServiceRequest = function(req, serviceMapAction) {
    let url = identifyServiceUrl(serviceMapAction.serviceTarget) + serviceMapAction.path;
    let reqBody = {};
    let authorize = true;
    
    // console.log('before params check');
    if (serviceMapAction.paramType.length > 0) {    
        if (serviceMapAction.paramType.indexOf("param") > -1) {
            let pathParameters = serviceMapAction.pathParam;
            let appendUrl = "";        
            for (const p of pathParameters) {
                if (!(p in req.body)) {
                    throw {status: 400, message: "parameters not found in request body"}
                }
                appendUrl += "/" + req.body[p];
            }
            url += appendUrl;
        }
        // support only single value, array not supported yet
        if (serviceMapAction.paramType.indexOf("query") > -1) {
            let queryParameters = serviceMapAction.queryParam;
            let appendUrl = "?";
            for (const q of queryParameters) {
                if (!(q.name in req.body)) {
                    throw {status: 400, message: "parameters not found in request body"}
                }
                appendUrl += q + "=" + req.body[q.name];
            }
            url += appendUrl;
        }
        if (serviceMapAction.paramType.indexOf("body") > -1) {
            let bodyParameters = serviceMapAction.param
                .filter(p => p.paramType === "body")
                .map(p => p);
            for (const p of bodyParameters) { 
                if (!(p.name in req.body)) {
                    throw {status: 400, message: "parameters not found in request body"}
                }           
                reqBody[p.name] = req.body[p.name]
            }
        }
    } else {
        if (serviceMapAction.method.toUpperCase() === "POST") {
            reqBody['emptyToken'] = utils.emptyToken(12);
        }
    }
    // console.log('after params check');

    // console.log('request header: ', req.headers["authorization"]);
    if (!serviceMapAction.public) {
        if (!(req.headers["authorization"] == null || req.headers["Authorization"] == null)) {
            logger.info('authorization check: false');
            authorize = false;
        }
        logger.info('authorization check: true');
    }

    return {
        headers: req.headers,
        url: url,
        body: utils.isEmpty(reqBody) ? null : reqBody,
        method: serviceMapAction.method,
        authorize: authorize
    };
}

const prepareRequest = async function(req, action) {
    return new Promise((resolve, reject) => {
        if (apiServiceRoutes === undefined) init();

        const serviceMapAction = apiServiceRoutes[action];

        if (serviceMapAction) {
            let paramValid = false;
            for (const t of serviceMapAction.paramType) {
                paramValid = validateReqParam(req, serviceMapAction, t);

                if (!paramValid) {                    
                    break;
                }
            }

            if (serviceMapAction.paramType.length === 0) {
                paramValid = true;
            }

            if (!paramValid) {
                req.log.error(`${action} - param validation failed`);
                reject({
                    status: 400,
                    message: `${action} - param validation failed`
                });
            }

            const requestObject = constructServiceRequest(req, serviceMapAction);

            if (requestObject.authorize) {
                req.log.debug(requestObject);
                resolve(requestObject);
            } else {
                req.log.error("request need authorization");
                reject({
                    status: 401,
                    message: "request need authorization"
                });
            }

        } else {
            req.log.error("no service mapping found");
            reject({
                status: 404,
                message: "no service mapping found"
            });
        }
    });
}

const call = async function(request) {
    try {
        if (request.method == null) {
            throw {status: 500, message: "incorrect http calling method"};
        }

        let resp;
        let options = {
            method: request.method,
            headers: request.headers,
            body: null,
            timeout: 30000, 
        };

        if (request.body != null) {            
            options.body = JSON.stringify(request.body);
        } else if (request.method.toUpperCase() === 'GET') {
            delete options.body;
            delete options.headers['content-type'];
            delete options.headers['Content-Type'];
            delete options.headers['content-length'];
            delete options.headers['Content-Length'];
        }        

        logger.info("call http request: ", request);

        resp = await fetch(request.url, options);

        if (resp.ok) {
            if (resp.headers.get('content-type') === 'application/json') {
                return await resp.json();
            } else {
                return await resp.text();
            }
        } else {
            throw {status: resp.status, message: resp.statusText};
        }
        
    } catch (err) {
        throw {status: err.status, message: err.message};
    }
}

const parallelCall = async function(requests) {
    return new Promise((resolve, reject) => {
        let httpCalls = {};
        for (const [key, func] of Object.entries(requests)) {
            httpCalls[key] = async () => {
                    console.log(`making call for ${key}`)
                    return await call(func) 
                }
        }
        if (utils.isEmpty(httpCalls)) {
            reject({status: 500, message: "no valid http calls"});
        }

        logger.info("calling parallel http requests: ", httpCalls);

        async.parallel(httpCalls, (err, result) => {            
            if (err && result === null) reject(err);
            
            const resultKeys = Object.keys(result);
            const requestKeys = Object.keys(requests);
            if (resultKeys.length === requestKeys.length) {
                resolve(result);
            } else {
                let anyError = false;
                for (const [key, func] of Object.entries(requests)) {
                    if ((result[key] == null) || resultKeys.indexOf(key) <= -1) {
                        result[key] = err;
                        anyError = true;
                    }
                }

                if (anyError) reject(result);

                resolve(result);
            }


        });
    })
}

init();

module.exports = {
    init: init,
    apiServiceRoutes,
    prepareRequest,
    call,
    parallelCall
}