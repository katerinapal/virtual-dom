"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualText = undefined;

var _version = require("./version");

function VirtualText(text) {
    this.text = String(text);
}

VirtualText.prototype.version = _version.versionjs;
VirtualText.prototype.type = "VirtualText";
var exported_VirtualText = VirtualText;
exports.VirtualText = exported_VirtualText;
