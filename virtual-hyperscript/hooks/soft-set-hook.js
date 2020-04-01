'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};
var exported_SoftSetHook = SoftSetHook;
exports.SoftSetHook = exported_SoftSetHook;
