var mod_EvHook = EvHook;
import ext_EvStore from "ev-store";
'use strict';

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = ext_EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = ext_EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};
export { mod_EvHook as EvHook };
