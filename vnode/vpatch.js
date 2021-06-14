"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualPatch = exports.THUNK = exports.REMOVE = exports.INSERT = exports.ORDER = exports.PROPS = exports.WIDGET = exports.VNODE = exports.VTEXT = undefined;

var _version = require("./version");

var THUNK;
var REMOVE;
var INSERT;
var ORDER;
var PROPS;
var WIDGET;
var VNODE;
var VTEXT;
var NONE;

NONE = 0;
exports.VTEXT = VTEXT = 1;
exports.VNODE = VNODE = 2;
exports.WIDGET = WIDGET = 3;
exports.PROPS = PROPS = 4;
exports.ORDER = ORDER = 5;
exports.INSERT = INSERT = 6;
exports.REMOVE = REMOVE = 7;
exports.THUNK = THUNK = 8;

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
}

VirtualPatch.prototype.version = _version.versionjs;
VirtualPatch.prototype.type = "VirtualPatch";
exports.VTEXT = VTEXT;
exports.VNODE = VNODE;
exports.WIDGET = WIDGET;
exports.PROPS = PROPS;
exports.ORDER = ORDER;
exports.INSERT = INSERT;
exports.REMOVE = REMOVE;
exports.THUNK = THUNK;
exports.VirtualPatch = VirtualPatch;