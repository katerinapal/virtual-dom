import { versionjs as version_versionjsjs } from "./version";

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version_versionjsjs
VirtualPatch.prototype.type = "VirtualPatch"
var exported_VirtualPatch = VirtualPatch;
export { exported_VirtualPatch as VirtualPatch };
