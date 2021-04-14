const fs = require('fs');
let apiServiceRoutes;

const init = function() {
    console.log("init run");
    apiServiceRoutes = JSON.parse(fs.readFileSync(__dirname + '/../api.json', 'utf8'));
    console.log("init done");
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
                console.log("inside filter: ", p);
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

const constructServiceRequest = function(req, serviceMapAction) {
    let url = serviceMapAction.path;
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
        if (!req.getHeader("authorization")) {
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
                console.error("param validation failed");
                reject("param validation failed");
            }

            const requestObject = constructServiceRequest(req, serviceMapAction);
            if (requestObject.authorize) {
                resolve(requestObject);
            } else {
                console.error("request need authorization");
                reject("request need authorization");
            }

        } else {
            console.error("no service mapping found");
            reject("no service mapping found");
        }
    });
}

init();

module.exports = {
    init: init,
    apiServiceRoutes: apiServiceRoutes,
    prepareRequest: prepareRequest
}