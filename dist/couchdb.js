'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MemberDao = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by beggl on 11/5/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _nano = require('nano');

var _nano2 = _interopRequireDefault(_nano);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MemberDao = exports.MemberDao = function () {
    function MemberDao() {
        _classCallCheck(this, MemberDao);

        this.fam = (0, _nano2.default)('http://localhost:5984').use('fam');
    }

    _createClass(MemberDao, [{
        key: 'getMembers',
        value: function getMembers(name) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.fam.get(name, function (err, doc) {
                    if (err !== null) return reject(err);
                    resolve(doc.allMembers);
                });
            });
        }
    }]);

    return MemberDao;
}();