"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isVirtualNode = undefined;

var _version = require("./version");

var mod_isVirtualNode = isVirtualNode;


function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === _version.versionjs;
}
exports.isVirtualNode = mod_isVirtualNode;