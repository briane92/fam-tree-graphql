'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _memberSchema = require('./models/Member/memberSchema');

var _memberSchema2 = _interopRequireDefault(_memberSchema);

var _graphqlTools = require('graphql-tools');

var _couchdb = require('./couchdb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RootQuery = '\n    type RootQuery {\n        allMembers: [Member!]\n    }\n'; /**
                                                                                   * Created by beggl on 11/4/2017.
                                                                                   */

var SchemaDefinition = '\n    schema {\n        query: RootQuery\n    }';

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

var resolverMap = {
    RootQuery: {
        allMembers: function allMembers(obj, args, context) {
            // console.log("hi")
            // console.log(dao)
            console.log(dao.getMembers('budfam').then(function (data) {
                return data;
            }));
            return dao.getMembers('budfam').then(function (data) {
                return data;
            });
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