const handler = require('./handler');

module.exports = async function (fastify, opts, done) {
    fastify.get('/', handler.hello);
    fastify.post('/register', handler.registerUser);
    fastify.post('/login', handler.userLogin);
    fastify.post('/create-user-skillset-profile', handler.createSkillsetProfile);
    fastify.post('/update-user-skillset-profile', handler.updateUserSkillsetProfile);
    fastify.post('/get-user-skillset-profile', handler.getUserSkillsetProfile);
    fastify.post('/get-list-of-skills', handler.getListOfSkills);
    fastify.post('/delete-user-skillset-profile', handler.deleteSkillsetProfile);
    done();
}