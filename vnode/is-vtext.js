"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isVirtualText = undefined;

var _version = require("./version");

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === _version.versionjs;
}
var exported_isVirtualText = isVirtualText;
exports.isVirtualText = exported_isVirtualText;
