import ext_test from "tape";
import ext_document from "global/document";
import { h as h_h } from "../h";
import { diff as diff_diff } from "../diff";
import { patch as patch_patch } from "../patch";
import { createElement as render } from "../create-element";
import { patchCount as patchcount_patchCount } from "./lib/patch-count";


ext_test("style patches correctly", function (assert) {
    var leftNode = h_h("div", {
        style: {
            border: "1px solid #000"
        }
    })

    var rightNode = h_h("div", {
        style: {
            padding: "5px"
        }
    })

    var patches = diff_diff(leftNode, rightNode)
    assert.equal(patchcount_patchCount(patches), 1);

    var rootNode = render(leftNode)
    assert.equal(rootNode.style.border, style("border", "1px solid #000"))

    var newRoot = patch_patch(rootNode, patches)
    assert.equal(rootNode, newRoot)

    assert.equal(newRoot.style.padding, style("padding", "5px"))
    assert.equal(newRoot.style.border, style("border", ""))

    assert.end()
})

function style(name, setValue) {
    var div = ext_document.createElement("div")
    div.style[name] = setValue
    return div.style[name]
}

