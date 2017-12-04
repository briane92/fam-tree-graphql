'use strict';

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by beggl on 12/3/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */


require('babel-polyfill');

var MONGO_URL = 'mongodb://localhost:27017/famtree';

module.exports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var db;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _mongodb2.default.connect(MONGO_URL);

        case 2:
          db = _context.sent;
          return _context.abrupt('return', { Users: db.collection('users') });

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));