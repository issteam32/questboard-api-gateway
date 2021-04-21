const { questServiceUrl } = require('./config');
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


const createQuest = async function(request, reply) {
    try {
        const createQuestRequest = await gateway.prepareRequest(request, "createQuest");

        const resp = await gateway.call(createQuestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const updateQuest = async function(request, reply) {
    try {
        const updateQuestRequest = await gateway.prepareRequest(request, "updateQuest");

        const resp = await gateway.call(updateQuestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const deleteQuest = async function(request, reply) {
    try {
        const deleteQuestRequest = await gateway.prepareRequest(request, "deleteQuest");

        const resp = await gateway.call(deleteQuestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const getUserQuest = async function(request, reply) {
    try {
        const getUserQuestRequest = await gateway.prepareRequest(request, "getUserQuest");

        const resp = await gateway.call(getUserQuestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const getQuest = async function(request, reply) {
    try {
        const getSingleQuestRequest = await gateway.prepareRequest(request, "getSingleQuest");

        const resp = await gateway.call(getSingleQuestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const getQuestByCategory = async function(request, reply) {
    try {
        const getQuestByCategoryRequest = await gateway.prepareRequest(request, "getQuestByCategory");

        const resp = await gateway.call(getQuestByCategoryRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const deleteQuestUserConcern = async function(request, reply) {
    try {
        const deleteQuestUserConcernRequest = await gateway.prepareRequest(request, "deleteQuestUserConcern");

        const resp = await gateway.call(deleteQuestUserConcernRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const createQuestUserConcern = async function(request, reply) {
    try {
        const createQuestUserConcernRequest = await gateway.prepareRequest(request, "createQuestUserConcern");
        const resp = await gateway.call(createQuestUserConcernRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const getChatRoomMessages = async function(request, reply) {
    try {
        const getQuestChatMessagesRequest = await gateway.prepareRequest(request, "getQuestChatMessages");
        const resp = await gateway.call(getQuestChatMessagesRequest);
        console.log(getQuestChatMessagesRequest);
        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const getChatMessageById = async function(request, reply) {
    try {
        const getChatMessageByIdRequest = await gateway.prepareRequest(request, "getChatMessageById");
        const resp = await gateway.call(getChatMessageById);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const createQuestProposal = async function(request, reply) {
    try {
        const questServiceUrl2 = "http://192.168.49.2:30005";
        const apiUrl = questServiceUrl2 + "/api/q/v1/quest/proposal";
        const body = request.body;
        const headers = request.headers;
        const createQuestProposalRequest =  {
            headers: headers,
            url: apiUrl,
            body: body,
            method: "POST"            
        };

        const resp = await gateway.call(createQuestProposalRequest);
        
        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const updateQuestProposal = async function(request, reply) {
    try {

    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const getQuestProposal = async function(request, reply) {
    try {
        const getQuestProposalRequest = await gateway.prepareRequest(request, "getQuestProposal");
        const resp = await gateway.call(getQuestProposalRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const deleteQuestProposal = async function(request, reply) {
    try {
        const deleteQuestProposalRequest = await gateway.prepareRequest(request, "deleteQuestProposal");
        const resp = await gateway.call(deleteQuestProposalRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const evaluateQuestProposal = async function(request, reply) {
    try {
        const evaluateQuestProposalRequest = await gateway.prepareRequest(request, "evaluateQuestProposal");
        const resp = await gateway.call(evaluateQuestProposalRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const deleteQuestRequestTaker = async function(request, reply) {
    try {
        const deleteQuestRequestTakerRequest = await gateway.prepareRequest(request, "deleteQuestRequestTaker");
        const resp = await gateway.call(deleteQuestRequestTakerRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const getQuestRequestTaker = async function(request, reply) {
    try {
        const getQuestRequestTakerRequest = await gateway.prepareRequest(request, "getQuestRequestTaker");
        const resp = await gateway.call(getQuestRequestTakerRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const getQuestRequestTakerByQuest = async function(request, reply) {
    try {
        const getQuestRequestTakerByQuestRequest = await gateway.prepareRequest(request, "getQuestRequestTakerByQuest");
        const resp = await gateway.call(getQuestRequestTakerByQuestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}



const createQuestTakerRequest = async function(request, reply) {
    try {
        const createQuestTakerRequestRequest = await gateway.prepareRequest(request, "createQuestTakerRequest");
        const resp = await gateway.call(createQuestTakerRequestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}


const updateQuestTakerRequest = async function(request, reply) {
    try {
        const updateQuestTakerRequestRequest = await gateway.prepareRequest(request, "updateQuestTakerRequest");
        const resp = await gateway.call(updateQuestTakerRequestRequest);

        return resp;
    } catch (err) {
        request.log.error(err);
        throw {statusCode: err.status, message: err.message};
    }
}

const getChatRooms = async function(request, reply) {
    try {
        const getChatRoomsRequest = await gateway.prepareRequest(request, "getChatRooms");
        const resp = await gateway.call(getChatRoomsRequest);

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
    getQuest,
    createQuest,
    updateQuest,
    deleteQuest,
    getUserQuest,
    getQuestByCategory,
    createQuestUserConcern,
    deleteQuestUserConcern,
    getChatRoomMessages,
    getChatMessageById,
    getQuestProposal,
    createQuestProposal,
    evaluateQuestProposal,
    deleteQuestProposal,
    deleteQuestRequestTaker,
    getQuestRequestTaker,
    getQuestRequestTakerByQuest,
    createQuestTakerRequest,
    updateQuestTakerRequest,
    getChatRooms
}