"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isthunk_isThunk = isThunk;

function isThunk(t) {
    return t && t.type === "Thunk";
}
exports.isThunk = isthunk_isThunk;