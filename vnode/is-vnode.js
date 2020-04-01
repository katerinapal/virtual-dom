"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isVirtualNode = undefined;

var _version = require("./version");

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === _version.versionjs;
}
var exported_isVirtualNode = isVirtualNode;
exports.isVirtualNode = exported_isVirtualNode;
