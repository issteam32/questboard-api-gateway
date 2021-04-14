const fs = require('fs');
const axios = require('axios').default;
const config = require('./config');
let apiServiceRoutes;

const init = function() {
    console.log("init run");
    apiServiceRoutes = JSON.parse(fs.readFileSync(__dirname + '/../api.json', 'utf8'));
    console.log("init done");
    console.log(apiServiceRoutes);
}

const validateReqParam = function(req, serviceMapAction, type) {
    let reqParam;       
    let paramType;

    if (type === "body") {
        reqParam = req.body;
        paramType = "body";
    } else if (type === "param") {
        reqParam = req.param;
        paramType = "param";
    } else if (type === "query") {
        reqParam = req.query;
        paramType = "query";  
    }

    if (reqParam && paramType) {
        let paramValid;    
        const requiredParams = serviceMapAction.param
            .filter(p => {
                // console.log("inside filter: ", p);
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
                    paramValid = true;
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
    
    if (serviceMapAction.paramType.indexOf("param") > -1) {
        let pathParameters = serviceMapAction.pathParam;
        let appendUrl = "";        
        for (const p of pathParameters) {
            appendUrl += "/" + req.body[p];
        }
        url += appendUrl;
    }
    // support only single value, array not supported yet
    if (serviceMapAction.paramType.indexOf("query") > -1) {
        let queryParameters = serviceMapAction.queryParam;
        let appendUrl = "?";
        for (const q of queryParameters) {
            appendUrl += q + "=" + req.body[q];
        }
        url += appendUrl;
    }
    if (serviceMapAction.paramType.indexOf("body") > -1) {
        let bodyParameters = serviceMapAction.param
            .filter(p => p.paramType === "body")
            .map(p => p);
        for (const p of bodyParameters) {            
            reqBody[p.name] = req.body[p.name]
        }
    }

    if (!serviceMapAction.public) {
        if (!(req.headers["authorization"] || req.headers["Authorization"])) {
            authorize = false;
        }
    }

    return {
        headers: req.headers,
        url: url,
        body: reqBody,
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

            if (!paramValid) {
                req.log.error("param validation failed");
                reject({
                    status: 400,
                    message: "param validation failed"
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

const call = async function(requestObject) {
    try {
        let request = {};
        if (requestObject.method === "POST") {
            request['method'] = 'post';
            request['url'] = requestObject.url;
            request['headers'] = requestObject.headers;
            request['data'] = requestObject.body;            
        } else if (requestObject.method === "GET") {
            request['method'] = 'get';
            request['url'] = requestObject.url;
            request['headers'] = requestObject.headers;            
        } else if (requestObject.method === "PUT") {
            request['method'] = 'put';
            request['url'] = requestObject.url;
            request['headers'] = requestObject.headers;
            request['data'] = requestObject.body;
        } else if (requestObject.method === "DELETE") {
            request['method'] = 'delete';
            request['url'] = requestObject.url;
            request['headers'] = requestObject.headers;            
        }
        const response = await axios(request);
        return response.data;
    } catch (err) {
        throw {status: err.response.status, message: err.message};
    }
}

init();

module.exports = {
    init: init,
    apiServiceRoutes,
    prepareRequest,
    call,
}