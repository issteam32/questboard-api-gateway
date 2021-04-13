const hello = async function(req, rep) {
    return 'hello, world';
}

module.exports.handler = {
    hello: hello
}