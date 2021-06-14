import { diff as diff_diff } from "./diff.js";
import { patch as patch_patch } from "./patch.js";
import { h as h_h } from "./h.js";
import { createElement as create } from "./create-element.js";
import { VirtualNode as VNode } from "./vnode/vnode.js";
import { VirtualText as VText } from "./vnode/vtext.js";

mod_indexjs = {
    diff: diff_diff,
    patch: patch_patch,
    h: h_h,
    create: create,
    VNode: VNode,
    VText: VText
}
var mod_indexjs;
export { mod_indexjs as indexjs };
