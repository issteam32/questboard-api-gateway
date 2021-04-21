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

Server is running at 0.0.0.0:8080, in local, try connect it with http://localhost:8080

Current Available routes:

```
╔═══════════╤═══════════════════════════════════╗
║ Method(s) │ Path                              ║
╟───────────┼───────────────────────────────────╢
║       GET │ /api/                             ║
║      POST │ /api/chat-message                 ║
║      POST │ /api/chat-room-and-messages       ║
║      POST │ /api/chat-rooms                   ║
║      POST │ /api/create-everyday-profile      ║
║      POST │ /api/create-quest                 ║
║      POST │ /api/create-quest-proposal        ║
║      POST │ /api/create-quest-user-concern    ║
║      POST │ /api/create-taker-request         ║
║      POST │ /api/create-user-skillset-profile ║
║      POST │ /api/delete-quest                 ║
║      POST │ /api/delete-quest-proposal        ║
║      POST │ /api/delete-quest-user-concern    ║
║      POST │ /api/delete-taker-request         ║
║      POST │ /api/delete-user-skillset-profile ║
║      POST │ /api/evaluate-proposal            ║
║      POST │ /api/get-category-quest           ║
║      POST │ /api/get-list-of-skills           ║
║      POST │ /api/get-professional-profile     ║
║      POST │ /api/get-proposal                 ║
║      POST │ /api/get-quest-taker-request      ║
║      POST │ /api/get-single-quest             ║
║      POST │ /api/get-taker-request            ║
║      POST │ /api/get-user-full-profile        ║
║      POST │ /api/get-user-quest               ║
║      POST │ /api/get-user-skillset-profile    ║
║      POST │ /api/login                        ║
║      POST │ /api/register                     ║
║      POST │ /api/update-everyday-profile      ║
║      POST │ /api/update-professional-profile  ║
║      POST │ /api/update-quest                 ║
║      POST │ /api/update-taker-request         ║
║      POST │ /api/update-user-skillset-profile ║
╚═══════════╧═══════════════════════════════════╝
```

More documents will be added later.

