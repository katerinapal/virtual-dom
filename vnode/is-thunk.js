function isThunk(t) {
    return t && t.type === "Thunk"
}
var exported_isThunk = isThunk;
export { exported_isThunk as isThunk };
