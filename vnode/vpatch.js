"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualPatch = exports.THUNK = exports.REMOVE = exports.INSERT = exports.ORDER = exports.PROPS = exports.WIDGET = exports.VNODE = exports.VTEXT = undefined;

var _version = require("./version");

var vpatch_VirtualPatch = VirtualPatch;

var vpatch_THUNK;
var vpatch_REMOVE;
var vpatch_INSERT;
var vpatch_ORDER;
var vpatch_PROPS;
var vpatch_WIDGET;
var vpatch_VNODE;
var vpatch_VTEXT;
var vpatch_NONE;

vpatch_NONE = 0;;
exports.VTEXT = vpatch_VTEXT = 1;;
exports.VNODE = vpatch_VNODE = 2;;
exports.WIDGET = vpatch_WIDGET = 3;;
exports.PROPS = vpatch_PROPS = 4;;
exports.ORDER = vpatch_ORDER = 5;;
exports.INSERT = vpatch_INSERT = 6;;
exports.REMOVE = vpatch_REMOVE = 7;;
exports.THUNK = vpatch_THUNK = 8;;

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
}

VirtualPatch.prototype.version = _version.versionjs;
VirtualPatch.prototype.type = "VirtualPatch";
exports.VTEXT = vpatch_VTEXT;
exports.VNODE = vpatch_VNODE;
exports.WIDGET = vpatch_WIDGET;
exports.PROPS = vpatch_PROPS;
exports.ORDER = vpatch_ORDER;
exports.INSERT = vpatch_INSERT;
exports.REMOVE = vpatch_REMOVE;
exports.THUNK = vpatch_THUNK;
exports.VirtualPatch = vpatch_VirtualPatch;