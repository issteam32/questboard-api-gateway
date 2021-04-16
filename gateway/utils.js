const randomstring = require('randomstring');

const isEmpty = function(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

const emptyToken = function(len = 10) {
    return randomstring.generate({
            length: len,
            charset: 'alphabetic'
        });
}

module.exports = {
    isEmpty,
    emptyToken
}