'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _mongoConnector = require('./mongo-connector');

var _mongoConnector2 = _interopRequireDefault(_mongoConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by beggl on 11/1/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


require('babel-polyfill');

var start = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var mongo, buildOptions, app;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _mongoConnector2.default)();

                    case 2:
                        mongo = _context.sent;

                        buildOptions = function buildOptions(res) {
                            var headers = res.headers;
                            return { context: { headers: headers, mongo: mongo }, schema: _schema2.default };
                        };

                        app = (0, _express2.default)();

                        app.options('*', (0, _cors2.default)());
                        app.use((0, _cors2.default)());
                        app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(buildOptions));
                        app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));
                        app.listen(4000, function () {
                            return console.log("Now browse to localhost:4000/graphiql");
                        });

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function start() {
        return _ref.apply(this, arguments);
    };
}();
start();