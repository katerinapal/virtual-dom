var mod_patchCount = patchCount;

function patchCount(patch) {
    var count = 0

    for (var key in patch) {
        if (key !== "a" && patch.hasOwnProperty(key)) {
            count++
        }
    }

    return count
}
export { mod_patchCount as patchCount };
