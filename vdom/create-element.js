import document from "global/document";
import { applyProperties as applyproperties_applyPropertiesjs } from "./apply-properties";
import { isVirtualNode as vnodeisvnode_isVirtualNodejs } from "../vnode/is-vnode.js";
import { isVirtualText as vnodeisvtext_isVirtualTextjs } from "../vnode/is-vtext.js";
import { isWidget as vnodeiswidget_isWidgetjs } from "../vnode/is-widget.js";
import { handleThunk as vnodehandlethunk_handleThunkjs } from "../vnode/handle-thunk.js";

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = vnodehandlethunk_handleThunkjs(vnode).a

    if (vnodeiswidget_isWidgetjs(vnode)) {
        return vnode.init()
    } else if (vnodeisvtext_isVirtualTextjs(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!vnodeisvnode_isVirtualNodejs(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyproperties_applyPropertiesjs(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}
var exported_createElement = createElement;
export { exported_createElement as createElement };
