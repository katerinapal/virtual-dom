import ext_test from "tape";
import { h as h_h } from "../h.js";
import { createElement as createelement_createElement } from "../create-element.js";
import { diff as diff_diff } from "../diff.js";
import { patch as patch_patch } from "../patch.js";

ext_test("attributes can be set", function (assert) {
    var leftTree = h_h("div")

    var rightTree = h_h("div",{
        attributes: {
            src: "test.jpg"
        }
    })

    var rootNode = createelement_createElement(leftTree)
    var patches = diff_diff(leftTree, rightTree)

    var newRootNode = patch_patch(rootNode, patches)

    assert.equal(newRootNode.getAttribute("src"), "test.jpg")
    assert.end()
})

ext_test("individual attributes can be unset", function (assert) {
    var leftTree = h_h("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    })

    var rightTree = h_h("div", {
        attributes: {
            a: "1",
            c: "3"
        }
    })

    var rootNode = createelement_createElement(leftTree)
    var patches = diff_diff(leftTree, rightTree)

    var newRootNode = patch_patch(rootNode, patches)

    assert.equal(newRootNode, rootNode)
    assert.equal(newRootNode.getAttribute("a"), "1")
    assert.ok(newRootNode.getAttribute("b") == null)
    assert.equal(newRootNode.getAttribute("c"), "3")
    assert.end()
})

ext_test("attributes can be completely unset", function (assert) {
    var leftTree = h_h("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    })

    var rightTree = h_h("div")

    var rootNode = createelement_createElement(leftTree)
    var patches = diff_diff(leftTree, rightTree)


    var newRootNode = patch_patch(rootNode, patches)

    assert.equal(newRootNode, rootNode)
    assert.ok(newRootNode.getAttribute("a") == null)
    assert.ok(newRootNode.getAttribute("b") == null)
    assert.ok(newRootNode.getAttribute("c") == null)
    assert.end()
})
