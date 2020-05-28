var patchop_applyPatch = applyPatch;
import { applyProperties as applyproperties_applyPropertiesjs } from "./apply-properties";
import { isWidget as vnodeiswidget_isWidgetjs } from "../vnode/is-widget.js";

import {
    VTEXT as vpatchjs_VTEXT,
    VNODE as vpatchjs_VNODE,
    WIDGET as vpatchjs_WIDGET,
    PROPS as vpatchjs_PROPS,
    ORDER as vpatchjs_ORDER,
    INSERT as vpatchjs_INSERT,
    REMOVE as vpatchjs_REMOVE,
    THUNK as vpatchjs_THUNK,
} from "../vnode/vpatch.js";

import { updateWidget as updatewidget_updateWidgetjs } from "./update-widget";

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case vpatchjs_REMOVE:
            return removeNode(domNode, vNode)
        case vpatchjs_INSERT:
            return insertNode(domNode, patch, renderOptions)
        case vpatchjs_VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case vpatchjs_WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case vpatchjs_VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case vpatchjs_ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case vpatchjs_PROPS:
            applyproperties_applyPropertiesjs(domNode, patch, vNode.properties)
            return domNode
        case vpatchjs_THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updatewidget_updateWidgetjs(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && vnodeiswidget_isWidgetjs(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}
export { patchop_applyPatch as applyPatch };
