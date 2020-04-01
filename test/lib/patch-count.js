function patchCount(patch) {
    var count = 0

    for (var key in patch) {
        if (key !== "a" && patch.hasOwnProperty(key)) {
            count++
        }
    }

    return count
}
var exported_patchCount = patchCount;
export { exported_patchCount as patchCount };
