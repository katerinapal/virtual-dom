import ext_globaldocument_document from "global/document";
import ext_nexttick_nextTick from "next-tick";
'use strict';

var encapsulated_MutableFocusHook;

encapsulated_MutableFocusHook = MutableFocusHook;

function MutableFocusHook() {
    if (!(this instanceof MutableFocusHook)) {
        return new MutableFocusHook();
    }
}

MutableFocusHook.prototype.hook = function (node) {
    ext_nexttick_nextTick(function () {
        if (ext_globaldocument_document.activeElement !== node) {
            node.focus();
        }
    });
};
