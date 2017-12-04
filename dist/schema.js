'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _memberSchema = require('./models/Member/memberSchema');

var _memberSchema2 = _interopRequireDefault(_memberSchema);

var _graphqlTools = require('graphql-tools');

var _couchdb = require('./couchdb');

var _authenication = require('./authenication');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by beggl on 11/4/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


require('babel-polyfill');

var RootQuery = '\n    type SigninPayload {\n        token: String\n        user: String\n    }\n    \n    input AuthData {\n        userName: String!\n        password: String!\n    } \n    \n    input MemberData {\n        name: String!\n        relation: String\n        bio: String\n    }\n    \n    type Query {\n        allMembers(userName:String!) : [Member!]\n    }\n    \n    type Mutation {\n        signin(auth: AuthData): SigninPayload \n        createMember(input:MemberData!): Member\n    }\n        \n';

var SchemaDefinition = '\n    schema {\n        query: Query\n        mutation: Mutation\n    }';

var members = [{
    id: 0,
    familyId: 0,
    name: 'Breshay Green',
    relation: 'Sister',
    bio: 'I was born in Sept 29, 1992'
}, {
    id: 1,
    familyId: 0,
    relation: 'Brother',
    name: 'Musa Smith',
    bio: 'Im musa, I like to rap'
}];
var dao = new _couchdb.MemberDao();

var getToken = function getToken(token) {
    return token.replace("Bearer ", "");
};

var isAuthenicated = function isAuthenicated(context) {
    console.log(context);
    var authHeader = context.headers.authorization;
    if (authHeader === undefined) return false;
    var jwtoken = getToken(authHeader);
    return jwtoken !== null && jwtoken !== undefined;
};

var getCurrentUser = function getCurrentUser(context) {
    console.log(context);
    var authHeader = context.headers.authorization;
    if (authHeader === undefined) return false;
    var jwtoken = getToken(authHeader);
    if (jwtoken) {
        var payload = (0, _authenication.verifyJWT)(jwtoken);
        console.log(payload);
        return payload.sub;
    }
};

var resolverMap = {
    Query: {
        allMembers: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(obj, args, context) {
                var userName, Users, query, _members;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!isAuthenicated(context)) {
                                    _context.next = 12;
                                    break;
                                }

                                userName = args.userName;

                                console.log(userName);
                                Users = context.mongo.Users;
                                query = { userName: userName };
                                _members = '';
                                _context.next = 8;
                                return Users.findOne(query).then(function (result) {
                                    _members = result.members;
                                });

                            case 8:
                                console.log(_members);
                                return _context.abrupt('return', _members);

                            case 12:
                                throw new Error('User must be logged');

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function allMembers(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return allMembers;
        }()
    },
    Mutation: {
        signin: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj, args, context) {
                var Users, auth, query, authenticated;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                Users = context.mongo.Users;
                                auth = args.auth;
                                query = { userName: auth.userName };
                                authenticated = false;
                                _context2.next = 6;
                                return Users.findOne(query).then(function (result) {
                                    console.log(result.password);
                                    if (result.password == auth.password) {
                                        authenticated = true;
                                    }
                                });

                            case 6:
                                if (!authenticated) {
                                    _context2.next = 10;
                                    break;
                                }

                                return _context2.abrupt('return', { token: (0, _authenication.generateJWT)(auth.userName), user: auth.userName });

                            case 10:
                                throw new Error('Incorrect credentials');

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function signin(_x4, _x5, _x6) {
                return _ref2.apply(this, arguments);
            }

            return signin;
        }(),
        createMember: function createMember(obj, args, context) {
            var Users = context.mongo.Users;
            var input = args.input;

            var query = { userName: getCurrentUser(context) };
            var update = {
                $push: { members: input }
            };
            Users.updateOne(query, update, function (err, count, status) {
                console.log('err is ' + err);
                console.log('count is ' + count);
            });
            return input;
        }
    }
};

exports.default = (0, _graphqlTools.makeExecutableSchema)({
    typeDefs: [SchemaDefinition, RootQuery, _memberSchema2.default
    // we have to destructure array imported from the post.js file
    // as typeDefs only accepts an array of strings or functions
    ],
    // we could also concatenate arrays
    // typeDefs: [SchemaDefinition, RootQuery].concat(Post)
    resolvers: resolverMap
});