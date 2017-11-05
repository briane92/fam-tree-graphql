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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const schema = makeExecutableSchema({typeDefs, resolvers})
var app = (0, _express2.default)(); /**
                                     * Created by beggl on 11/1/2017.
                                     */


app.options('*', (0, _cors2.default)());
app.use((0, _cors2.default)());
app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: _schema2.default }));
app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));
app.listen(4000, function () {
  return console.log("Now browse to localhost:4000/graphiql");
});