"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function isThunk(t) {
    return t && t.type === "Thunk";
}
var exported_isThunk = isThunk;
exports.isThunk = exported_isThunk;
