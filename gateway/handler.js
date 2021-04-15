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

const updateUserSkillsetProfile = async function(request, reply) {
    try {
        const serviceRequest = await gateway.prepareRequest(request, "updateSkillSetProfile");        
        
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
        const serviceRequest = await gateway.prepareRequest(request, "getUserSkillSetProfile");        
        
        const resp = await gateway.call(serviceRequest);
        
        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const deleteSkillsetProfile = async function(request, reply) {
    try {
        const serviceRequest = await gateway.prepareRequest(request, "deleteSkillSetProfile");        
        
        const resp = await gateway.call(serviceRequest);
        
        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}



const getListOfSkills = async function(request, reply) {
    try {
        const serviceRequest = await gateway.prepareRequest(request, "getListOfSkills");        
        
        const resp = await gateway.call(serviceRequest);        

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

module.exports = {
    hello,
    registerUser,
    userLogin,
    createSkillsetProfile,
    getUserSkillsetProfile,
    updateUserSkillsetProfile,
    deleteSkillsetProfile,
    getListOfSkills
}