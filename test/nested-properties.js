import ext_test from "tape";
import { h as h_h } from "../h.js";
import { diff as diff_diff } from "../diff.js";
import { patch as patch_patch } from "../patch.js";
import { createElement as render } from "../create-element.js";
import { assertEqualDom as assertequaldom_assertEqualDom } from "./lib/assert-equal-dom.js";

ext_test("dom node style", function (assert) {
    var a = h_h("div", {
        style: {
            border: "none",
            className: "oops",
            display: "none"
        }
    })

    var b = h_h("div", {
        style: {
            border: "1px solid #000",
            className: "oops",
            display: ""
        }
    })

    var rootNode = render(a)
    assert.equal(rootNode.style.border, style("border", "none"))
    assert.equal(rootNode.style.className, style("className", "oops"))
    assert.equal(rootNode.style.display, style("display", "none"))
    var s1 = rootNode.style
    var equalNode = render(b)
    assert.equal(equalNode.style.border, style("border", "1px solid #000"))
    assert.equal(equalNode.style.className, style("className", "oops"))
    assert.equal(equalNode.style.display, style("display", ""))
    var newRoot = patch_patch(rootNode, diff_diff(a, b))
    var s2 = newRoot.style
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.equal(newRoot.style.border, style("border", "1px solid #000"))
    assert.equal(newRoot.style.className, style("className", "oops"))
    assert.equal(newRoot.style.display, style("display", ""))
    assert.equal(s1, s2)
    assert.end()
})

ext_test("dom node dataset", function (assert) {
    var a = h_h("div", { dataset: { foo: "bar", bar: "oops" } })
    var b = h_h("div", { dataset: { foo: "baz", bar: "oops" } })
    var rootNode = render(a)
    var d1 = rootNode.dataset
    assert.equal(rootNode.dataset.foo, "bar")
    assert.equal(rootNode.dataset.bar, "oops")
    var equalNode = render(b)
    var newRoot = patch_patch(rootNode, diff_diff(a, b))
    var d2 = newRoot.dataset
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.equal(newRoot.dataset.foo, "baz")
    assert.equal(newRoot.dataset.bar, "oops")
    assert.equal(d1, d2)
    assert.end()
})

ext_test("dom node attributes", function (assert) {
    var a = h_h("div", { attributes: { foo: "bar", bar: "oops" } })
    var b = h_h("div", { attributes: { foo: "baz", bar: "oops" } })
    var rootNode = render(a)
    var equalNode = render(b)

    var newRoot = patch_patch(rootNode, diff_diff(a, b))

    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.equal(newRoot.getAttribute("foo"), "baz")
    assert.equal(newRoot.getAttribute("bar"), "oops")
    assert.end()
})

ext_test("patch nested properties in right only", function (assert) {
    var prev = h_h("div")
    var curr = h_h("div", { style: { display: "none" } })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.style.display, style("display", "none"))

    assert.end()
})

ext_test("null properties", function (assert) {
    var prev = h_h("div", { propA: "bar", propC: {} })
    var curr = h_h("div", { propB: "apples" })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA, "")
    assert.equal(elem.propC, null)
    assert.equal(elem.propB, "apples")

    assert.end()
})

ext_test("replace object with value", function (assert) {
    var prev = h_h("div", { propA: { foo: "bar" } })
    var curr = h_h("div", { propA: null })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA, null)
    assert.end()
})

ext_test("create object on node for nested properties", function (assert) {
    var prev = h_h("div", { propA: null })
    var curr = h_h("div", { propA: { nested: true } })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA.nested, true)
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
