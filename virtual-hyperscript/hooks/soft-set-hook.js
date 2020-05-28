'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var softsethook_SoftSetHook = SoftSetHook;
'use strict';

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
exports.SoftSetHook = softsethook_SoftSetHook;