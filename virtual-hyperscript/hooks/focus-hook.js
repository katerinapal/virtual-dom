import document from "global/document";
import nextTick from "next-tick";
'use strict';

var encapsulated_MutableFocusHook;

encapsulated_MutableFocusHook = MutableFocusHook;

function MutableFocusHook() {
    if (!(this instanceof MutableFocusHook)) {
        return new MutableFocusHook();
    }
}

MutableFocusHook.prototype.hook = function (node) {
    nextTick(function () {
        if (document.activeElement !== node) {
            node.focus();
        }
    });
};
