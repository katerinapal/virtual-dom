"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualText = undefined;

var _version = require("./version");

var vtext_VirtualText = VirtualText;


function VirtualText(text) {
    this.text = String(text);
}

VirtualText.prototype.version = _version.versionjs;
VirtualText.prototype.type = "VirtualText";
exports.VirtualText = vtext_VirtualText;