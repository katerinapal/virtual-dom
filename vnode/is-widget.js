"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mod_isWidget = isWidget;

function isWidget(w) {
    return w && w.type === "Widget";
}
exports.isWidget = mod_isWidget;