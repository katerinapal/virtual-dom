var vpatch_VirtualPatch = VirtualPatch;
import { versionjs as version_versionjsjs } from "./version";
var vpatch_THUNK;
var vpatch_REMOVE;
var vpatch_INSERT;
var vpatch_ORDER;
var vpatch_PROPS;
var vpatch_WIDGET;
var vpatch_VNODE;
var vpatch_VTEXT;
var vpatch_NONE;

vpatch_NONE = 0;;
vpatch_VTEXT = 1;;
vpatch_VNODE = 2;;
vpatch_WIDGET = 3;;
vpatch_PROPS = 4;;
vpatch_ORDER = 5;;
vpatch_INSERT = 6;;
vpatch_REMOVE = 7;;
vpatch_THUNK = 8;;

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version_versionjsjs
VirtualPatch.prototype.type = "VirtualPatch"
export { vpatch_VTEXT as VTEXT, vpatch_VNODE as VNODE, vpatch_WIDGET as WIDGET, vpatch_PROPS as PROPS, vpatch_ORDER as ORDER, vpatch_INSERT as INSERT, vpatch_REMOVE as REMOVE, vpatch_THUNK as THUNK };
export { vpatch_VirtualPatch as VirtualPatch };
