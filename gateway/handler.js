const config = require('./config');
const gateway = require('./gateway');

const hello = async function(req, rep) {
    return 'hello, world';
}

const registerUser = async function(request, reply) {
    try {        
        const serviceRequest = await gateway.prepareRequest(request, "registerNewUser");
        console.log('service request got ', serviceRequest);
        
        return false;
    } catch (err) {
        console.error("[ERROR] ", err);
        reply.code(400);
        return false;
    }
}


module.exports = {
    hello: hello,
    registerUser: registerUser
}