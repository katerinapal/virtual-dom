'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nodesFromArray = undefined;

var _h = require('../../h.js');

var nodesfromarray_nodesFromArray = nodesFromArray;

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

        children.push((0, _h.h)('div', properties, properties.id));
    }

    return (0, _h.h)('div', children);
}
exports.nodesFromArray = nodesfromarray_nodesFromArray;