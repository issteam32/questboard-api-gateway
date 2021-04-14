const gateway = require('./gateway');

const hello = async function(req, rep) {
    return 'hello, world';
}

const registerUser = async function(request, reply) {
    try {        
        const serviceRequest = await gateway.prepareRequest(request, "registerNewUser");

        const resp = await gateway.call(serviceRequest);

        return resp;
    } catch (err) { 
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const userLogin = async function(request, reply) {
    try {
        const serviceRequest = await gateway.prepareRequest(request, "loginUser");        
        
        const resp = await gateway.call(serviceRequest);

        return resp;
    } catch (err) {
        console.log(err);
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const createSkillsetProfile = async function(request, reply) {
    try {
        const serviceRequest = await gateway.prepareRequest(request, "createSkillSetProfile");        
        
        const resp = await gateway.call(serviceRequest);
        request.log.info(serviceRequest);
        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const getUserSkillsetProfile = async function(request, reply) {
    try {
        
    } catch (err) {
        request.log.error(err);
        reply.code(400);
        return false;
    }
}

module.exports = {
    hello,
    registerUser,
    userLogin,
    createSkillsetProfile,
    getUserSkillsetProfile,
}