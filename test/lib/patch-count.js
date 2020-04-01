"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function patchCount(patch) {
    var count = 0;

    for (var key in patch) {
        if (key !== "a" && patch.hasOwnProperty(key)) {
            count++;
        }
    }

    return count;
}
var exported_patchCount = patchCount;
exports.patchCount = exported_patchCount;
