import { versionjs as version } from "./version";
var THUNK;
var REMOVE;
var INSERT;
var ORDER;
var PROPS;
var WIDGET;
var VNODE;
var VTEXT;
var NONE;

NONE = 0
VTEXT = 1
VNODE = 2
WIDGET = 3
PROPS = 4
ORDER = 5
INSERT = 6
REMOVE = 7
THUNK = 8

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"
export { VTEXT, VNODE, WIDGET, PROPS, ORDER, INSERT, REMOVE, THUNK, VirtualPatch };
