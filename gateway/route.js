const handler = require('./handler');

module.exports = async function (fastify, opts, done) {
    fastify.get('/', handler.hello);
    fastify.post('/register', handler.registerUser);
    fastify.post('/login', handler.userLogin);
    fastify.post('/create-user-skillset-profile', handler.createSkillsetProfile);
    fastify.post('/update-user-skillset-profile', handler.updateUserSkillsetProfile);
    fastify.post('/get-user-skillset-profile', handler.getUserSkillsetProfile);
    fastify.post('/get-user-full-profile', handler.getUserProfile);
    fastify.post('/get-list-of-skills', handler.getListOfSkills);
    fastify.post('/delete-user-skillset-profile', handler.deleteSkillsetProfile);
    fastify.post('/create-everyday-profile', handler.createEverydayProfile);
    fastify.post('/update-everyday-profile', handler.updateEverydayProfile);
    fastify.post('/get-professional-profile', handler.updateEverydayProfile);
    fastify.post('/update-professional-profile', handler.updateEverydayProfile);
    fastify.post('/create-quest', handler.createQuest);
    fastify.post('/update-quest', handler.updateQuest);
    fastify.post('/get-single-quest', handler.getQuest);
    fastify.post('/get-user-quest', handler.getUserQuest);
    fastify.post('/get-category-quest', handler.getQuestByCategory);
    fastify.post('/delete-quest', handler.deleteQuest);
    fastify.post('/create-quest-user-concern', handler.createQuestUserConcern);
    fastify.post('/delete-quest-user-concern', handler.deleteQuestUserConcern);
    fastify.post('/chat-room-and-messages', handler.getChatRoomMessages);
    fastify.post('/chat-message', handler.getChatMessageById);
    fastify.post('/create-quest-proposal', handler.createQuestProposal);
    fastify.post('/get-proposal', handler.getQuestProposal);
    fastify.post('/evaluate-proposal', handler.evaluateQuestProposal);
    fastify.post('/delete-quest-proposal', handler.deleteQuestProposal);
    fastify.post('/get-taker-request', handler.getQuestRequestTaker);
    fastify.post('/get-quest-taker-request', handler.getQuestRequestTakerByQuest);
    fastify.post('/create-taker-request', handler.createQuestTakerRequest);
    fastify.post('/update-taker-request', handler.updateQuestTakerRequest);
    fastify.post('/delete-taker-request', handler.deleteQuestRequestTaker);
    fastify.post('/chat-rooms', handler.getChatRooms);

    done();
}