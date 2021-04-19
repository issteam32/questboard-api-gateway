require('dotenv').config();

const fastify = require('fastify')({logger:{ prettyPrint: false}});
fastify.register(require('fastify-cors'));
fastify.register(require('fastify-print-routes'));
fastify.register(require('fastify-compress'));

fastify.register(require('./gateway/route'), { prefix: '/api' });

const start = async () => {
    try {
        const port = process.env.PORT || 8080;
        const host = process.env.SERVER_HOST || '0.0.0.0';
        console.log(`server is running at ${host}:${port}`);
        await fastify.listen(port, host);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();