import ext_test from "tape";
import ext_isObject from "is-object";
import { h as h_h } from "../h.js";
import { diff as diff_diff } from "../diff.js";
import { patch as patch_patch } from "../patch.js";
import { createElement as render } from "../create-element.js";

ext_test("undefined props are not set in create-element", function (assert) {
    var node = h_h("div", { special: undefined })
    var rootNode = render(node)
    assert.ok(!("special" in rootNode))
    assert.end()
})

ext_test("undefined removes all previous styles", function (assert) {
    var leftNode = h_h("div", {
        style: {
            display: "none",
            border: "1px solid #000"
        }
    })

    var rightNode = h_h("div", {
        style: undefined
    })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.style.display, style("display", ""))
    assert.equal(rootNode.style.border, style("border", ""))
    assert.end();
})

ext_test("undefined style removes individual styles", function (assert) {
    var leftNode = h_h("div", { "style": { "display": "none" }})
    var rightNode = h_h("div", { "style": undefined })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.style.display, style("display", ""))
    assert.end()
})

ext_test("undefined ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value
        if (value !== rootNode[propName]) {
            rootNode[propName] = value
        }
    }

    var leftNode = h_h("input", { value: new CheckNodeBeforeSet("hello") })
    var rightNode = h_h("input", { value: undefined })

    var rootNode = render(leftNode)
    assert.equal(rootNode.value, "hello")

    var newRoot = patch_patch(rootNode, diff_diff(leftNode, rightNode))
    assert.equal(newRoot.value, "hello")

    assert.end()
})

ext_test("undefined nulls other complex types", function (assert) {
    var leftNode = h_h("input", { special: {} })
    var rightNode = h_h("input", { special: null })

    var rootNode = render(leftNode)
    assert.ok(ext_isObject(rootNode.special))


    var newRoot = patch_patch(rootNode, diff_diff(leftNode, rightNode))
    assert.equal(newRoot.special, null)

    assert.end()
})

ext_test("null not ignored for value", function (assert) {
    var leftNode = h_h("input", { value: "hello" })
    var rightNode = h_h("input", { value: null })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.value, property("input", "value", null))
    assert.end()
})

ext_test("null not ignored for objects", function (assert) {
    var leftNode = h_h("div", { "test": { "complex": "object" }})
    var rightNode = h_h("div", { "test": null })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.test, null)
    assert.end()
})

ext_test("null not ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value
        if (value !== rootNode[propName]) {
            rootNode.value = value
        }
    }

    var leftNode = h_h("input", { value: new CheckNodeBeforeSet("hello") })
    var rightNode = h_h("input", { value: null })

    var rootNode = render(leftNode)
    assert.equal(rootNode.value, "hello")

    var newRoot = patch_patch(rootNode, diff_diff(leftNode, rightNode))
    assert.equal(newRoot.value, property("input", "value", null))

    assert.end()
})

function createAndPatch(prev, curr) {
    var elem = render(prev)
    var patches = diff_diff(prev, curr)
    return patch_patch(elem, patches);
}

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = render(h_h())
    node.style[name] = value
    return node.style[name]
}

// Safely transaltes node property using the DOM in the browser
function property(tag, prop, value) {
    var node = render(h_h(tag))
    node[prop] = value
    return node[prop]
}
