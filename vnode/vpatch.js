"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualPatch = undefined;

var _version = require("./version");

var mod_VirtualPatch = VirtualPatch;


VirtualPatch.NONE = 0;
VirtualPatch.VTEXT = 1;
VirtualPatch.VNODE = 2;
VirtualPatch.WIDGET = 3;
VirtualPatch.PROPS = 4;
VirtualPatch.ORDER = 5;
VirtualPatch.INSERT = 6;
VirtualPatch.REMOVE = 7;
VirtualPatch.THUNK = 8;

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
}

VirtualPatch.prototype.version = _version.versionjs;
VirtualPatch.prototype.type = "VirtualPatch";
exports.VirtualPatch = mod_VirtualPatch;