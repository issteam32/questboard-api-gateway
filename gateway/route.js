const handler = require('./handler');

module.exports = async function (fastify, opts, done) {
    fastify.get('/', handler.hello);
    fastify.post('/register', handler.registerUser);
    fastify.post('/login', handler.userLogin);
    fastify.post('/create-user-skillset-profile', handler.createSkillsetProfile);
    done();
}