"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mod_isThunk = isThunk;

function isThunk(t) {
    return t && t.type === "Thunk";
}
exports.isThunk = mod_isThunk;