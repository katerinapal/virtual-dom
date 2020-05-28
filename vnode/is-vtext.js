"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isVirtualText = undefined;

var _version = require("./version");

var isvtext_isVirtualText = isVirtualText;


function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === _version.versionjs;
}
exports.isVirtualText = isvtext_isVirtualText;