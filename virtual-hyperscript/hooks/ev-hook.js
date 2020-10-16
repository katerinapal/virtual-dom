var evhook_EvHook = EvHook;
import ext_evstore_EvStore from "ev-store";
'use strict';

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = ext_evstore_EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = ext_evstore_EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};
export { evhook_EvHook as EvHook };
