const fastify = require("fastify");
const {handler} = require('./handler');

module.exports = async function (fastify, opts, done) {
    fastify.get('/', handler.hello);
}