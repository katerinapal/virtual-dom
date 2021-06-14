var mod_isThunk = isThunk;

function isThunk(t) {
    return t && t.type === "Thunk"
}
export { mod_isThunk as isThunk };
