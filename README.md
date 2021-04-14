# questboard-api-gateway
Mobile api gateway for questboard
---------------------------------

This is a API Gateway designed to be fast and scalable. 

The gateway should be small and easy to maintain.

The following request flow is what we want to achieve.
![alt text](https://github.com/issteam32/questboard-api-gateway/blob/master/diagram1.png?raw=true)

Client send request to api gateway and request data from microservice A and B. There are two different http call we need to make. 

### Current implementation
The client request contains of the required parameters to make the two api request to microsservice A and B. 

To simplify our gateway, we only accept POST request for now. all the required parameter will be place inside request body. Once it reach the gateway, the request will be process by the gateway and make http call to request data accordingly.

To produce the microservice http call out of incoming http request, there are some schema structure need to follow.
Check on the json schema below.

```
"registerNewUser": {
        "param": [
            {
                "name": "username",
                "type": "string",
                "paramType": "body",
                "required": true
            },
            {
                "name": "email",
                "type": "string",
                "paramType": "body",
                "required": true
            },
            {
                "name": "password",
                "type": "string",
                "paramType": "body",
                "required": true
            },
            {
                "name": "passwordConfirm",
                "type": "string",
                "paramType": "body",
                "required": true
            }
        ],
        "method": "POST",
        "paramType": ["body", "param", "query"],
        "path": "/api/u/v1/user/register",
        "accept": "application/json",
        "public": true,
        "queryParam": ["name", "password"],
        "pathParam": ["id", "issueNum"]
    },
```

The schema above is a sample for the gateway to produce the required microservice http call. Check on /gateway/handler.js for it's implementation.

Add new schema to api.json, so that the gateway will load it when then app initialize. 

More documents will be added later.