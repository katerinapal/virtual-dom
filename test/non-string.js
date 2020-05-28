import ext_tape_test from "tape";
import { h as h_hjs } from "../h.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";
import { createElement as createelement_createElementjs } from "../create-element.js";

ext_tape_test("coerce numbers to strings in children array", function (assert) {
    var leftNode = h_hjs("div", [ "clicked ", 1336, " times" ])
    var rightNode = h_hjs("div", [ "clicked ", 1337, " times" ])
    var rootNode = createelement_createElementjs(leftNode)
    var newRoot = patch_patchjs(rootNode, diff_diffjs(leftNode, rightNode))
    assert.equal(newRoot.toString(), '<div>clicked 1337 times</div>')
    assert.end()
})
