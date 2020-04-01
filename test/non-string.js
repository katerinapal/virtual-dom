import test from "tape";
import { h as h_hjs } from "../h.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";
import { createElement as createelement_createElementjs } from "../create-element.js";

test("coerce numbers to strings in children array", function (assert) {
    var leftNode = h_hjs
    var rightNode = h_hjs
    var rootNode = createelement_createElementjs
    var newRoot = patch_patchjs
    assert.equal(newRoot.toString(), '<div>clicked 1337 times</div>')
    assert.end()
})
