require('dotenv').config();

const fastify = require('fastify')({logger:{ prettyPrint: true}});

fastify.register(require('./gateway/route'));

fastify.register(require('fastify-cors'))

const start = async () => {
    try {
        await fastify.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();