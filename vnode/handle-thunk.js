"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleThunk = undefined;

var _isVnode = require("./is-vnode");

var _isVtext = require("./is-vtext");

var _isWidget = require("./is-widget");

var _isThunk = require("./is-thunk");

var handlethunk_handleThunk = handleThunk;


function handleThunk(a, b) {
    var renderedA = a;
    var renderedB = b;

    if ((0, _isThunk.isThunk)(b)) {
        renderedB = renderThunk(b, a);
    }

    if ((0, _isThunk.isThunk)(a)) {
        renderedA = renderThunk(a, null);
    }

    return {
        a: renderedA,
        b: renderedB
    };
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode;

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous);
    }

    if (!((0, _isVnode.isVirtualNode)(renderedThunk) || (0, _isVtext.isVirtualText)(renderedThunk) || (0, _isWidget.isWidget)(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk;
}
exports.handleThunk = handlethunk_handleThunk;