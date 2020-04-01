import test from "tape";
import { h as h_hjs } from "../h.js";
import { createElement as createelement_createElementjs } from "../create-element.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";

test("attributes can be set", function (assert) {
    var leftTree = h_hjs

    var rightTree = h_hjs

    var rootNode = createelement_createElementjs
    var patches = diff_diffjs

    var newRootNode = patch_patchjs

    assert.equal(newRootNode.getAttribute("src"), "test.jpg")
    assert.end()
})

test("individual attributes can be unset", function (assert) {
    var leftTree = h_hjs

    var rightTree = h_hjs

    var rootNode = createelement_createElementjs
    var patches = diff_diffjs

    var newRootNode = patch_patchjs

    assert.equal(newRootNode, rootNode)
    assert.equal(newRootNode.getAttribute("a"), "1")
    assert.ok(newRootNode.getAttribute("b") == null)
    assert.equal(newRootNode.getAttribute("c"), "3")
    assert.end()
})

test("attributes can be completely unset", function (assert) {
    var leftTree = h_hjs

    var rightTree = h_hjs

    var rootNode = createelement_createElementjs
    var patches = diff_diffjs


    var newRootNode = patch_patchjs

    assert.equal(newRootNode, rootNode)
    assert.ok(newRootNode.getAttribute("a") == null)
    assert.ok(newRootNode.getAttribute("b") == null)
    assert.ok(newRootNode.getAttribute("c") == null)
    assert.end()
})
