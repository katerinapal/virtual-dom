var createelement_createElement = createElement;
import ext_globaldocument_document from "global/document";

function createElement(vnode, opts) {
    var doc = opts ? opts.document || ext_globaldocument_document : ext_globaldocument_document
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
export { createelement_createElement as createElement };
