var handlethunk_handleThunk = handleThunk;

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isthunk_isThunkjs(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isthunk_isThunkjs(a)) {
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

    if (!(isvnode_isVirtualNodejs(renderedThunk) ||
            isvtext_isVirtualTextjs(renderedThunk) ||
            iswidget_isWidgetjs(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}
export { handlethunk_handleThunk as handleThunk };
