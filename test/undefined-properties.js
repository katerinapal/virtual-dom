import ext_tape_test from "tape";
import ext_isobject_isObject from "is-object";
import { h as h_hjs } from "../h.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";
import { createElement as createelement_createElementjs } from "../create-element.js";

ext_tape_test("undefined props are not set in create-element", function (assert) {
    var node = h_hjs("div", { special: undefined })
    var rootNode = createelement_createElementjs(node)
    assert.ok(!("special" in rootNode))
    assert.end()
})

ext_tape_test("undefined removes all previous styles", function (assert) {
    var leftNode = h_hjs("div", {
        style: {
            display: "none",
            border: "1px solid #000"
        }
    })

    var rightNode = h_hjs("div", {
        style: undefined
    })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.style.display, style("display", ""))
    assert.equal(rootNode.style.border, style("border", ""))
    assert.end();
})

ext_tape_test("undefined style removes individual styles", function (assert) {
    var leftNode = h_hjs("div", { "style": { "display": "none" }})
    var rightNode = h_hjs("div", { "style": undefined })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.style.display, style("display", ""))
    assert.end()
})

ext_tape_test("undefined ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value
        if (value !== rootNode[propName]) {
            rootNode[propName] = value
        }
    }

    var leftNode = h_hjs("input", { value: new CheckNodeBeforeSet("hello") })
    var rightNode = h_hjs("input", { value: undefined })

    var rootNode = createelement_createElementjs(leftNode)
    assert.equal(rootNode.value, "hello")

    var newRoot = patch_patchjs(rootNode, diff_diffjs(leftNode, rightNode))
    assert.equal(newRoot.value, "hello")

    assert.end()
})

ext_tape_test("undefined nulls other complex types", function (assert) {
    var leftNode = h_hjs("input", { special: {} })
    var rightNode = h_hjs("input", { special: null })

    var rootNode = createelement_createElementjs(leftNode)
    assert.ok(ext_isobject_isObject(rootNode.special))


    var newRoot = patch_patchjs(rootNode, diff_diffjs(leftNode, rightNode))
    assert.equal(newRoot.special, null)

    assert.end()
})

ext_tape_test("null not ignored for value", function (assert) {
    var leftNode = h_hjs("input", { value: "hello" })
    var rightNode = h_hjs("input", { value: null })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.value, property("input", "value", null))
    assert.end()
})

ext_tape_test("null not ignored for objects", function (assert) {
    var leftNode = h_hjs("div", { "test": { "complex": "object" }})
    var rightNode = h_hjs("div", { "test": null })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.test, null)
    assert.end()
})

ext_tape_test("null not ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value
        if (value !== rootNode[propName]) {
            rootNode.value = value
        }
    }

    var leftNode = h_hjs("input", { value: new CheckNodeBeforeSet("hello") })
    var rightNode = h_hjs("input", { value: null })

    var rootNode = createelement_createElementjs(leftNode)
    assert.equal(rootNode.value, "hello")

    var newRoot = patch_patchjs(rootNode, diff_diffjs(leftNode, rightNode))
    assert.equal(newRoot.value, property("input", "value", null))

    assert.end()
})

function createAndPatch(prev, curr) {
    var elem = createelement_createElementjs(prev)
    var patches = diff_diffjs(prev, curr)
    return patch_patchjs(elem, patches);
}

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = createelement_createElementjs(h_hjs())
    node.style[name] = value
    return node.style[name]
}

// Safely transaltes node property using the DOM in the browser
function property(tag, prop, value) {
    var node = createelement_createElementjs(h_hjs(tag))
    node[prop] = value
    return node[prop]
}
