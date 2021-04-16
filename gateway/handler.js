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
        request.log.info(serviceRequest);
        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const getUserProfile = async function(request, reply) {
    try {
        const skillProfileRequest = await gateway.prepareRequest(request, "getUserSkillSetProfile"); 
        const everydayProfileRequest = await gateway.prepareRequest(request, "getUserEverydayProfile");
        const myProfileRequest = await gateway.prepareRequest(request, "myProfile");

        const resp = await gateway.parallelCall({
            myProfile: myProfileRequest,
            skillProfile: skillProfileRequest,
            everydayProfile: everydayProfileRequest
        });
                    
        return resp;
    } catch (err) {
        request.log.error(err);
        throw err;
    }
}

const deleteSkillsetProfile = async function(request, reply) {
    try {
        const serviceRequest = await gateway.prepareRequest(request, "deleteSkillSetProfile");        
        
        const resp = await gateway.call(serviceRequest);
        request.log.info(serviceRequest);
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
        // const resp = await gateway.parallelCall([serviceRequest,serviceRequest]);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const createEverydayProfile = async function(request, reply) {
    try {
        const createEverydayProfileRequest = await gateway.prepareRequest(request, "createEveryDayProfile");

        const resp = await gateway.call(createEverydayProfileRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const updateEverydayProfile = async function(request, reply) {
    try {
        const createEverydayProfileRequest = await gateway.prepareRequest(request, "updateEveryDayProfile");

        const resp = await gateway.call(createEverydayProfileRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const getProfessionalProfile = async function(request, reply) {
    try {
        const createEverydayProfileRequest = await gateway.prepareRequest(request, "getProfessionalLevel");

        const resp = await gateway.call(createEverydayProfileRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}



const updateProfessionalProfile = async function(request, reply) {
    try {
        const createEverydayProfileRequest = await gateway.prepareRequest(request, "updateProfessionalLevel");

        const resp = await gateway.call(createEverydayProfileRequest);

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
    getListOfSkills,
    createEverydayProfile,
    getUserProfile,
    updateEverydayProfile,
    getProfessionalProfile,
    updateProfessionalProfile,
}