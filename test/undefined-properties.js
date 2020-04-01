import test from "tape";
import isObject from "is-object";
import { h as h_hjs } from "../h.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";
import { createElement as createelement_createElementjs } from "../create-element.js";

test("undefined props are not set in create-element", function (assert) {
    var node = h_hjs
    var rootNode = createelement_createElementjs
    assert.ok(!("special" in rootNode))
    assert.end()
})

test("undefined removes all previous styles", function (assert) {
    var leftNode = h_hjs

    var rightNode = h_hjs

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.style.display, style("display", ""))
    assert.equal(rootNode.style.border, style("border", ""))
    assert.end();
})

test("undefined style removes individual styles", function (assert) {
    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.style.display, style("display", ""))
    assert.end()
})

test("undefined ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value
        if (value !== rootNode[propName]) {
            rootNode[propName] = value
        }
    }

    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createelement_createElementjs
    assert.equal(rootNode.value, "hello")

    var newRoot = patch_patchjs
    assert.equal(newRoot.value, "hello")

    assert.end()
})

test("undefined nulls other complex types", function (assert) {
    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createelement_createElementjs
    assert.ok(isObject(rootNode.special))


    var newRoot = patch_patchjs
    assert.equal(newRoot.special, null)

    assert.end()
})

test("null not ignored for value", function (assert) {
    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.value, property("input", "value", null))
    assert.end()
})

test("null not ignored for objects", function (assert) {
    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.test, null)
    assert.end()
})

test("null not ignored for hooks", function (assert) {
    function CheckNodeBeforeSet(value) {
        this.value = value
    }
    CheckNodeBeforeSet.prototype.hook = function (rootNode, propName) {
        var value = this.value
        if (value !== rootNode[propName]) {
            rootNode.value = value
        }
    }

    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createelement_createElementjs
    assert.equal(rootNode.value, "hello")

    var newRoot = patch_patchjs
    assert.equal(newRoot.value, property("input", "value", null))

    assert.end()
})

function createAndPatch(prev, curr) {
    var elem = createelement_createElementjs
    var patches = diff_diffjs
    return patch_patchjs;
}

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = createelement_createElementjs
    node.style[name] = value
    return node.style[name]
}

// Safely transaltes node property using the DOM in the browser
function property(tag, prop, value) {
    var node = createelement_createElementjs
    node[prop] = value
    return node[prop]
}
