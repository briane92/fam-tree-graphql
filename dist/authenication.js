'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyJWT = exports.generateJWT = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'thisisasecretdonttellanyone'; /**
                                             * Created by beggl on 11/30/2017.
                                             */


var generateJWT = function generateJWT(userId) {
    return _jsonwebtoken2.default.sign({}, secret, {
        subject: userId
    });
};

var verifyJWT = function verifyJWT(token) {
    var payload = null;
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
        if (decoded) payload = decoded;
    });
    console.log("payload is " + payload);
    return payload;
};

exports.generateJWT = generateJWT;
exports.verifyJWT = verifyJWT;