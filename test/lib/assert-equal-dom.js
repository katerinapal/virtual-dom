"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function assertEqualDom(assert, a, b) {
    assert.ok(areEqual(a, b) && areEqual(b, a), "Dom structures are equal");
}

function areEqual(a, b) {
    for (var key in a) {
        if (key !== "parentNode" && key !== "parentElement" && key !== "defaultView" && key !== "ownerElement" && key !== "nextElementSibling" && key !== "nextSibling" && key !== "previousElementSibling" && key !== "previousSibling" && key !== "document" && key !== "window" && key !== "frames" && key !== "top" && key !== "parent" && key !== "self" && key !== "outerHTML" && key !== "innerHTML" && key !== "spellcheck" && key !== "bind" && "" + parseInt(key, 10) !== key) {
            if (key === "ownerDocument") {
                return a[key] === b[key];
            }
            if (key === "style") {
                return equalStyle(a[key], b[key]);
            }
            if ((typeof a === "undefined" ? "undefined" : _typeof(a)) === "object" || typeof a === "function") {
                if (!areEqual(a[key], b[key])) {
                    return false;
                }
            } else {
                if (a !== b) {
                    return false;
                }
            }
        }
    }

    return true;
}

// CssStyleDeclaration indexes the styles, which could be out of order
// This is a left sided check. Note that we call equal(a, b) and equal(b, a)
function equalStyle(a, b) {
    var keys = [];
    for (var key in a) {
        if ("" + parseInt(key, 10) === key) {
            continue;
        } else {
            keys.push(key);
        }
    }

    keys.sort();

    for (var i = 0; i < keys.length; i++) {
        if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}
var exported_assertEqualDom = assertEqualDom;
exports.assertEqualDom = exported_assertEqualDom;
