import ext_test from "tape";
import { h as h_h } from "../h.js";
import { diff as diff_diff } from "../diff.js";
import { patch as patch_patch } from "../patch.js";
import { createElement as createelement_createElement } from "../create-element.js";

ext_test("coerce numbers to strings in children array", function (assert) {
    var leftNode = h_h("div", [ "clicked ", 1336, " times" ])
    var rightNode = h_h("div", [ "clicked ", 1337, " times" ])
    var rootNode = createelement_createElement(leftNode)
    var newRoot = patch_patch(rootNode, diff_diff(leftNode, rightNode))
    assert.equal(newRoot.toString(), '<div>clicked 1337 times</div>')
    assert.end()
})
