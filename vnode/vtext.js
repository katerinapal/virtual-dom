"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VirtualText = undefined;

var _version = require("./version");

var mod_VirtualText = VirtualText;


function VirtualText(text) {
    this.text = String(text);
}

VirtualText.prototype.version = _version.versionjs;
VirtualText.prototype.type = "VirtualText";
exports.VirtualText = mod_VirtualText;