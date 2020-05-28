var isthunk_isThunk = isThunk;

function isThunk(t) {
    return t && t.type === "Thunk"
}
export { isthunk_isThunk as isThunk };
