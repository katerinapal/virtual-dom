import test from "tape";
import document from "global/document";
import { h as h_hjs } from "../h";
import { diff as diff_diffjs } from "../diff";
import { patch as patch_patchjs } from "../patch";
import { createElement as createelement_createElementjs } from "../create-element";
import { patchCount as libpatchcount_patchCountjs } from "./lib/patch-count";


test("style patches correctly", function (assert) {
    var leftNode = h_hjs

    var rightNode = h_hjs

    var patches = diff_diffjs
    assert.equal(libpatchcount_patchCountjs(patches), 1);

    var rootNode = createelement_createElementjs
    assert.equal(rootNode.style.border, style("border", "1px solid #000"))

    var newRoot = patch_patchjs
    assert.equal(rootNode, newRoot)

    assert.equal(newRoot.style.padding, style("padding", "5px"))
    assert.equal(newRoot.style.border, style("border", ""))

    assert.end()
})

function style(name, setValue) {
    var div = document.createElement("div")
    div.style[name] = setValue
    return div.style[name]
}

