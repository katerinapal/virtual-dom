"use strict";

var _document = require("global/document");

var _document2 = _interopRequireDefault(_document);

var _nextTick = require("next-tick");

var _nextTick2 = _interopRequireDefault(_nextTick);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

'use strict';

var encapsulated_MutableFocusHook;

encapsulated_MutableFocusHook = MutableFocusHook;

function MutableFocusHook() {
    if (!(this instanceof MutableFocusHook)) {
        return new MutableFocusHook();
    }
}

MutableFocusHook.prototype.hook = function (node) {
    (0, _nextTick2.default)(function () {
        if (_document2.default.activeElement !== node) {
            node.focus();
        }
    });
};