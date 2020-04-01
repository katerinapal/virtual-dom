"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nodesFromArray = undefined;

var _h = require("../../h.js");

function nodesFromArray(array) {
    var i = 0;
    var children = [];
    var key;
    var properties;

    for (; i < array.length; i++) {
        key = array[i];

        if (key != null) {
            properties = {
                key: key,
                id: String(key)
            };
        } else {
            properties = {
                id: 'no-key-' + i
            };
        }

        children.push(_h.h);
    }

    return _h.h;
}
var exported_nodesFromArray = nodesFromArray;
exports.nodesFromArray = exported_nodesFromArray;
