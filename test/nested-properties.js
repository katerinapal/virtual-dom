import test from "tape";
import { h as h_hjs } from "../h.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";
import { createElement as createelement_createElementjs } from "../create-element.js";
import { assertEqualDom as libassertequaldom_assertEqualDomjs } from "./lib/assert-equal-dom.js";

test("dom node style", function (assert) {
    var a = h_hjs

    var b = h_hjs

    var rootNode = createelement_createElementjs
    assert.equal(rootNode.style.border, style("border", "none"))
    assert.equal(rootNode.style.className, style("className", "oops"))
    assert.equal(rootNode.style.display, style("display", "none"))
    var s1 = rootNode.style
    var equalNode = createelement_createElementjs
    assert.equal(equalNode.style.border, style("border", "1px solid #000"))
    assert.equal(equalNode.style.className, style("className", "oops"))
    assert.equal(equalNode.style.display, style("display", ""))
    var newRoot = patch_patchjs
    var s2 = newRoot.style
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.equal(newRoot.style.border, style("border", "1px solid #000"))
    assert.equal(newRoot.style.className, style("className", "oops"))
    assert.equal(newRoot.style.display, style("display", ""))
    assert.equal(s1, s2)
    assert.end()
})

test("dom node dataset", function (assert) {
    var a = h_hjs
    var b = h_hjs
    var rootNode = createelement_createElementjs
    var d1 = rootNode.dataset
    assert.equal(rootNode.dataset.foo, "bar")
    assert.equal(rootNode.dataset.bar, "oops")
    var equalNode = createelement_createElementjs
    var newRoot = patch_patchjs
    var d2 = newRoot.dataset
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.equal(newRoot.dataset.foo, "baz")
    assert.equal(newRoot.dataset.bar, "oops")
    assert.equal(d1, d2)
    assert.end()
})

test("dom node attributes", function (assert) {
    var a = h_hjs
    var b = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs

    var newRoot = patch_patchjs

    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.equal(newRoot.getAttribute("foo"), "baz")
    assert.equal(newRoot.getAttribute("bar"), "oops")
    assert.end()
})

test("patch nested properties in right only", function (assert) {
    var prev = h_hjs
    var curr = h_hjs

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.style.display, style("display", "none"))

    assert.end()
})

test("null properties", function (assert) {
    var prev = h_hjs
    var curr = h_hjs

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA, "")
    assert.equal(elem.propC, null)
    assert.equal(elem.propB, "apples")

    assert.end()
})

test("replace object with value", function (assert) {
    var prev = h_hjs
    var curr = h_hjs

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA, null)
    assert.end()
})

test("create object on node for nested properties", function (assert) {
    var prev = h_hjs
    var curr = h_hjs

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA.nested, true)
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
