var mod_handleThunk = handleThunk;
import { isVirtualNode as isVNode } from "./is-vnode";
import { isVirtualText as isVText } from "./is-vtext";
import { isWidget as iswidget_isWidget } from "./is-widget";
import { isThunk as isthunk_isThunk } from "./is-thunk";

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isthunk_isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isthunk_isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            iswidget_isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}
export { mod_handleThunk as handleThunk };
