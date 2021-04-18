require('dotenv').config();

const fastify = require('fastify')({logger:{ prettyPrint: false}});
fastify.register(require('fastify-cors'));
fastify.register(require('fastify-print-routes'));
fastify.register(require('fastify-compress'));

fastify.register(require('./gateway/route'), { prefix: '/api' });

const start = async () => {
    try {
        await fastify.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();