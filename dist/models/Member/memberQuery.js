'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _memberSchema = require('./memberSchema');

var _memberSchema2 = _interopRequireDefault(_memberSchema);

var _graphql = require('../graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by beggl on 11/4/2017.
 */
var members = [];

exports.default = {
    getMembersByFamilyId: {
        type: new _graphql.GraphQLList(_memberSchema2.default),
        description: 'All the family members for a specific family',
        args: {
            familyId: {
                type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
            }
        },
        resolve: function resolve(source, _ref) {
            var id = _ref.id;

            return members;
        }
    }

};