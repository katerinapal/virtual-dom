import ext_tape_test from "tape";
import ext_globaldocument_document from "global/document";
import { h as h_hjs } from "../h";
import { diff as diff_diffjs } from "../diff";
import { patch as patch_patchjs } from "../patch";
import { createElement as createelement_createElementjs } from "../create-element";


ext_tape_test("style patches correctly", function (assert) {
    var leftNode = h_hjs("div", {
        style: {
            border: "1px solid #000"
        }
    })

    var rightNode = h_hjs("div", {
        style: {
            padding: "5px"
        }
    })

    var patches = diff_diffjs(leftNode, rightNode)
    assert.equal(libpatchcount_patchCountjs(patches), 1);

    var rootNode = createelement_createElementjs(leftNode)
    assert.equal(rootNode.style.border, style("border", "1px solid #000"))

    var newRoot = patch_patchjs(rootNode, patches)
    assert.equal(rootNode, newRoot)

    assert.equal(newRoot.style.padding, style("padding", "5px"))
    assert.equal(newRoot.style.border, style("border", ""))

    assert.end()
})

function style(name, setValue) {
    var div = ext_globaldocument_document.createElement("div")
    div.style[name] = setValue
    return div.style[name]
}

