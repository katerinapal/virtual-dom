import { diff as diff_diffjs } from "./diff.js";
import { patch as patch_patchjs } from "./patch.js";
import { h as h_hjs } from "./h.js";
import { createElement as createelement_createElementjs } from "./create-element.js";
import { VirtualNode as vnodevnode_VirtualNodejs } from "./vnode/vnode.js";
import { VirtualText as vnodevtext_VirtualTextjs } from "./vnode/vtext.js";
var indexjs_indexjs;

indexjs_indexjs = {
    diff: diff_diffjs,
    patch: patch_patchjs,
    h: h_hjs,
    create: createelement_createElementjs,
    VNode: vnodevnode_VirtualNodejs,
    VText: vnodevtext_VirtualTextjs
}
export { indexjs_indexjs as indexjs };
