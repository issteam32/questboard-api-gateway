const handler = require('./handler');

module.exports = async function (fastify, opts, done) {
    fastify.get('/', handler.hello);
    fastify.post('/register/:1/:2/:3', handler.registerUser);
    done();
}