"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var patchcount_patchCount = patchCount;

function patchCount(patch) {
    var count = 0;

    for (var key in patch) {
        if (key !== "a" && patch.hasOwnProperty(key)) {
            count++;
        }
    }

    return count;
}
exports.patchCount = patchcount_patchCount;