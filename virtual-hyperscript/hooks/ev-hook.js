"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EvHook = undefined;

var _evStore = require("ev-store");

var _evStore2 = _interopRequireDefault(_evStore);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var mod_EvHook = EvHook;

'use strict';

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = (0, _evStore2.default)(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function (node, propertyName) {
    var es = (0, _evStore2.default)(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};
exports.EvHook = mod_EvHook;