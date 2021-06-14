var mod_createElement = createElement;
import ext_document from "global/document";
import { applyProperties as applyproperties_applyProperties } from "./apply-properties";
import { isVirtualNode as isVNode } from "../vnode/is-vnode.js";
import { isVirtualText as isVText } from "../vnode/is-vtext.js";
import { isWidget as iswidget_isWidget } from "../vnode/is-widget.js";
import { handleThunk as handlethunk_handleThunk } from "../vnode/handle-thunk.js";

function createElement(vnode, opts) {
    var doc = opts ? opts.document || ext_document : ext_document
    var warn = opts ? opts.warn : null

    vnode = handlethunk_handleThunk(vnode).a

    if (iswidget_isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyproperties_applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}
export { mod_createElement as createElement };
