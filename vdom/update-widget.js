"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateWidget = undefined;

var _isWidget = require("../vnode/is-widget.js");

var updatewidget_updateWidget = updateWidget;


function updateWidget(a, b) {
    if ((0, _isWidget.isWidget)(a) && (0, _isWidget.isWidget)(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id;
        } else {
            return a.init === b.init;
        }
    }

    return false;
}
exports.updateWidget = updatewidget_updateWidget;