import ext_test from "tape";
import { h as h_h } from "../h.js";
import { diff as diff_diff } from "../diff.js";
import { patch as patch_patch } from "../patch.js";
import { createElement as createelement_createElement } from "../create-element.js";
import { VirtualNode as Node } from "../vnode/vnode";
import { VirtualText as TextNode } from "../vnode/vtext";
import { versionjs as version } from "../vnode/version";
import { assertEqualDom as assertequaldom_assertEqualDom } from "./lib/assert-equal-dom.js";
import { patchCount as patchcount_patchCount } from "./lib/patch-count.js";



// VirtualNode tests
ext_test("Node is a function", function (assert) {
    assert.equal(typeof Node, "function")
    assert.end()
})

ext_test("Node type and version are set", function (assert) {
    assert.equal(Node.prototype.type, "VirtualNode")
    assert.deepEqual(Node.prototype.version, version)
    assert.end()
})

ext_test("TextNode is a function", function (assert) {
    assert.equal(typeof TextNode, "function")
    assert.end()
})

ext_test("TextNode type and version are set", function (assert) {
    assert.equal(TextNode.prototype.type, "VirtualText")
    assert.deepEqual(TextNode.prototype.version, version)
    assert.end()
})

// h tests

ext_test("h is a function", function (assert) {
    assert.equal(typeof h_h, "function")
    assert.end()
})

ext_test("defaults to div node", function (assert) {
    var node = h_h()
    assertNode(assert, node, "DIV")
    assert.end()
})

ext_test("can use class selector", function (assert) {
    var node = h_h("div.pretty")
    assertNode(assert, node, "DIV", { className: "pretty" })
    assert.end()
})

ext_test("can use non-ascii class selector", function (assert) {
    var node = h_h("div.ΑΒΓΔΕΖ")
    assertNode(assert, node, "DIV", { className: "ΑΒΓΔΕΖ" })
    assert.end()
})

ext_test("class selectors combine with className property", function (assert) {
    var node = h_h("div.very", { className: "pretty" })
    assertNode(assert, node, "DIV", { className: "very pretty" })
    assert.end()
})

ext_test("can use id selector", function (assert) {
    var node = h_h("div#important")
    assertNode(assert, node, "DIV", { id: "important" })
    assert.end()
})

ext_test("can use non-ascii id selector", function (assert) {
    var node = h_h("div#ΑΒΓΔΕΖ")
    assertNode(assert, node, "DIV", { id: "ΑΒΓΔΕΖ" })
    assert.end()
})

ext_test("properties id overrides selector id", function (assert) {
    var node = h_h("div#very", { id: "important" })
    assertNode(assert, node, "DIV", { id: "important" })
    assert.end()
})

ext_test("defaults to div when using selectors", function (assert) {
    var node1 = h_h("#important")
    var node2 = h_h(".pretty")
    var node3 = h_h("#important.pretty")
    var node4 = h_h(".pretty#important")

    assertNode(assert, node1, "DIV", { id: "important" })
    assertNode(assert, node2, "DIV", { className: "pretty" })
    assertNode(assert, node3, "DIV", { id: "important", className: "pretty" })
    assertNode(assert, node4, "DIV", { id: "important", className: "pretty" })
    assert.end()
})

ext_test("second argument can be children", function (assert) {
    var node1 = h_h("#important.pretty", "test")
    var node2 = h_h("#important.pretty", ["test"])
    var node3 = h_h("#important.pretty", h_h("p", "testing"))
    var node4 = h_h("#important.pretty", [h_h("p", "testing")])

    var props = { id: "important", className: "pretty" }

    assertNode(assert, node1, "DIV", props, ["test"])
    assertNode(assert, node2, "DIV", props, ["test"])
    assertNode(assert, node3, "DIV", props, [["P", {}, ["testing"]]])
    assertNode(assert, node4, "DIV", props, [["P", {}, ["testing"]]])
    assert.end()
})

ext_test("third argument can be child or children", function (assert) {
    var node1 = h_h("#important.pretty", { a: "b" }, "test")
    var node2 = h_h("#important.pretty", { a: "b" }, ["test"])
    var node3 = h_h("#important.pretty", { a: "b" }, h_h("p", "testing"))
    var node4 = h_h("#important.pretty", { a: "b" }, [h_h("p", "testing")])

    var props = { a: "b", id: "important", className: "pretty" }

    assertNode(assert, node1, "DIV", props, ["test"])
    assertNode(assert, node2, "DIV", props, ["test"])
    assertNode(assert, node3, "DIV", props, [["P", {}, ["testing"]]])
    assertNode(assert, node4, "DIV", props, [["P", {}, ["testing"]]])
    assert.end()
})

function assertNode(assert, node, tagName, properties, children) {
    properties = properties || {}
    children = children || []

    assert.ok(node instanceof Node, "node is a VirtualNode")
    assert.equal(node.tagName, tagName, "tag names are equal")
    assert.deepEqual(node.properties, properties, "propeties are equal")
    assert.equal(node.children.length, children.length, "child count equal")
    for (var i = 0; i < children.length; i++) {
        var child = children[i]

        if (typeof child === "string") {
            assert.equal(node.children[i].text, child)
        } else {
            assertNode(assert,
                node.children[i],
                child[0],
                child[1],
                child[2])
        }
    }
}



// render tests
ext_test("render is a function", function (assert) {
    assert.equal(typeof h_h, "function")
    assert.end()
})

ext_test("render text node", function (assert) {
    var vdom = h_h("span", "hello")
    var dom = createelement_createElement(vdom)
    assert.equal(dom.tagName, "SPAN")
    assert.notOk(dom.id)
    assert.notOk(dom.className)
    assert.equal(dom.childNodes.length, 1)
    assert.equal(dom.childNodes[0].data, "hello")
    assert.end()
})

ext_test("render div", function (assert) {
    var vdom = h_h()
    var dom = createelement_createElement(vdom)
    assert.notOk(dom.id)
    assert.notOk(dom.className)
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

ext_test("node id is applied correctly", function (assert) {
    var vdom = h_h("#important")
    var dom = createelement_createElement(vdom)
    assert.equal(dom.id, "important")
    assert.notOk(dom.className)
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

ext_test("node class name is applied correctly", function (assert) {
    var vdom = h_h(".pretty")
    var dom = createelement_createElement(vdom)
    assert.notOk(dom.id)
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

ext_test("mixture of node/classname applied correctly", function (assert) {
    var vdom = h_h("#override.very", { id: "important", className: "pretty"})
    var dom = createelement_createElement(vdom)
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "very pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

ext_test("style object is applied correctly", function (assert) {
    var vdom = h_h("#important.pretty", { style: {
        border: "1px solid rgb(0, 0, 0)",
        padding: "2px"
    } })
    var dom = createelement_createElement(vdom)
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.border, style("border", "1px solid rgb(0, 0, 0)"))
    assert.equal(dom.style.padding, style("padding", "2px"))
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

ext_test("children are added", function (assert) {
    var vdom = h_h("div", [
        h_h("div", [
            "just testing",
            "multiple",
            h_h("b", "nodes")
        ]),
        "hello",
        h_h("span", "test")
    ])

    var dom = createelement_createElement(vdom)

    assert.equal(dom.childNodes.length, 3)

    var nodes = dom.childNodes
    assert.equal(nodes.length, 3)
    assert.equal(nodes[0].tagName, "DIV")
    assert.equal(nodes[1].data, "hello")
    assert.equal(nodes[2].tagName, "SPAN")

    var subNodes0 = nodes[0].childNodes
    assert.equal(subNodes0.length, 3)
    assert.equal(subNodes0[0].data, "just testing")
    assert.equal(subNodes0[1].data, "multiple")
    assert.equal(subNodes0[2].tagName, "B")

    var subNodes0_2 = subNodes0[2].childNodes
    assert.equal(subNodes0_2.length, 1)
    assert.equal(subNodes0_2[0].data, "nodes")

    var subNodes2 = nodes[2].childNodes
    assert.equal(subNodes2.length, 1)
    assert.equal(subNodes2[0].data, "test")
    assert.end()
})

ext_test("incompatible children are ignored", function (assert) {
    var vdom = h_h("#important.pretty", {
        style: {
            "cssText": "color: red;"
        }
    }, [
        null
    ])
    var dom = createelement_createElement(vdom)
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.cssText, style("cssText", "color: red;"))
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

ext_test("injected document object is used", function (assert) {
    var vdom = h_h("div", "hello")
    var count = 0
    var doc = {
        createElement: function createElement(tagName) {
            assert.equal(tagName, "DIV")
            count++
            return { tagName: "DIV", appendChild: function (t) {
                assert.equal(t, "hello")
                count++
            } }
        },
        createTextNode: function createTextNode(text) {
            assert.equal(text, "hello")
            count++
            return text
        }
    }
    createelement_createElement(vdom, { document: doc })
    assert.equal(count, 3)
    assert.end()
})

ext_test("injected warning is used", function (assert) {
    var badObject = {}
    var vdom = h_h("#important.pretty", {
        style: {
            cssText: "color: red;"
        }
    })

    vdom.children = [
        badObject, null
    ]

    var i = 0
    function warn(warning, node) {
        assert.equal(warning, "Item is not a valid virtual dom node")

        if (i === 0) {
            assert.equal(node, badObject)
        } else if (i === 1) {
            assert.equal(node, null)
        } else {
            assert.error("Too many warnings")
        }

        i++
    }

    var dom = createelement_createElement(vdom, { warn: warn })
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.cssText, style("cssText", "color: red;"))
    assert.equal(dom.childNodes.length, 0)
    assert.equal(i, 2)
    assert.end()
})

// Complete patch tests
ext_test("textnode update test", function (assert) {
    var hello = h_h("div", "hello")
    var goodbye = h_h("div", "goodbye")
    var rootNode = createelement_createElement(hello)
    var equalNode = createelement_createElement(goodbye)
    var patches = diff_diff(hello, goodbye)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

ext_test("textnode replace test", function (assert) {
    var hello = h_h("div", "hello")
    var goodbye = h_h("div", [h_h("span", "goodbye")])
    var rootNode = createelement_createElement(hello)
    var equalNode = createelement_createElement(goodbye)
    var patches = diff_diff(hello, goodbye)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

ext_test("textnode insert test", function (assert) {
    var hello = h_h("div", "hello")
    var again = h_h("span", ["hello", "again"])
    var rootNode = createelement_createElement(hello)
    var equalNode = createelement_createElement(again)
    var patches = diff_diff(hello, again)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

ext_test("textnode remove", function (assert) {
    var again = h_h("span", ["hello", "again"])
    var hello = h_h("div", "hello")
    var rootNode = createelement_createElement(again)
    var equalNode = createelement_createElement(hello)
    var patches = diff_diff(again, hello)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

ext_test("dom node update test", function (assert) {
    var hello = h_h("div.hello", "hello")
    var goodbye = h_h("div.goodbye", "goodbye")
    var rootNode = createelement_createElement(hello)
    var equalNode = createelement_createElement(goodbye)
    var patches = diff_diff(hello, goodbye)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

ext_test("dom node replace test", function (assert) {
    var hello = h_h("div", "hello")
    var goodbye = h_h("span", "goodbye")
    var rootNode = createelement_createElement(hello)
    var equalNode = createelement_createElement(goodbye)
    var patches = diff_diff(hello, goodbye)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

ext_test("dom node insert", function (assert) {
    var hello = h_h("div", [h_h("span", "hello")])
    var again = h_h("div", [h_h("span", "hello"), h_h("span", "again")])
    var rootNode = createelement_createElement(hello)
    var equalNode = createelement_createElement(again)
    var patches = diff_diff(hello, again)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

ext_test("dom node remove", function (assert) {
    var hello = h_h("div", [h_h("span", "hello")])
    var again = h_h("div", [h_h("span", "hello"), h_h("span", "again")])
    var rootNode = createelement_createElement(again)
    var equalNode = createelement_createElement(hello)
    var patches = diff_diff(again, hello)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})


ext_test("reuse dom node without breaking", function (assert) {
    var hSpan = h_h("span", "hello")
    var hello = h_h("div", [hSpan, hSpan, hSpan])
    var goodbye = h_h("div", [h_h("span", "hello"), hSpan, h_h("span", "goodbye")])
    var rootNode = createelement_createElement(hello)
    var equalNode = createelement_createElement(goodbye)
    var patches = diff_diff(hello, goodbye)
    var newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, equalNode)

    // Undo the rendering with new trees
    hello = h_h("div", [hSpan, hSpan, hSpan])
    goodbye = h_h("div", [h_h("span", "hello"), hSpan, h_h("span", "goodbye")])
    patches = diff_diff(goodbye, hello)
    newRoot = patch_patch(rootNode, patches)
    assertequaldom_assertEqualDom(assert, newRoot, rootNode)

    assert.end()
})

ext_test("Allow empty textnode", function (assert) {
    var empty = h_h("span", "")
    var rootNode = createelement_createElement(empty)
    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].data, "")
    assert.end()
})

ext_test("Can replace vnode with vtext", function (assert) {

    var leftNode = h_h("div", h_h("div"))
    var rightNode = h_h("div", "text")

    var rootNode = createelement_createElement(leftNode)

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].nodeType, 1)

    var patches = diff_diff(leftNode, rightNode)

    var newRoot = patch_patch(rootNode, patches)

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].nodeType, 3)

    assert.end()
})

// Widget tests
ext_test("Widget is initialised on render", function (assert) {
    var initCount = 0
    var testNode = createelement_createElement(h_h("div"))
    var Widget = {
        init: function () {
            initCount++
            return testNode
        },
        update: function () {
            initCount = 1000000
        },
        type: "Widget"
    }

    var result = createelement_createElement(Widget)

    assert.equal(initCount, 1)
    assert.equal(result, testNode)
    assert.end()
})

ext_test("Nested widget is initialised on render", function (assert) {
    var initCount = 0
    var testNode = createelement_createElement(h_h("div"))
    var Widget = {
        init: function () {
            initCount++
            return testNode
        },
        update: function () {
            initCount = 1000000
        },
        type: "Widget"
    }

    var vdom = h_h("div", [
        h_h("span", "text"),
        h_h("div.widgetContainer", [
            Widget
        ]),
        h_h("p", "more text")
    ])

    var result = createelement_createElement(vdom)

    assert.equal(initCount, 1)
    assert.equal(result.childNodes[1].childNodes[0], testNode)
    assert.end()
})

ext_test("Patch widgets at the root", function (assert) {
    var initCount = 0
    var updateCount = 0
    var leftState = { a: 1 }
    var rightState = { a: 2 }
    var domNode

    function Widget(state) {
        this.state = state
        this.vdom = this.render(state)
    }

    Widget.prototype.init = function () {
        initCount++
        return createelement_createElement(this.vdom);
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        assert.equal(this.state, rightState)
        assert.equal(leftNode.state, leftState)
        assert.equal(dom, domNode)
        patch_patch(dom, diff_diff(leftNode.vdom, this.vdom))
    }

    Widget.prototype.render = function (state) {
        return h_h("div", "" + state.a);
    }

    Widget.prototype.type = "Widget"

    var leftTree = new Widget(leftState)
    var rightTree = new Widget(rightState)
    domNode = createelement_createElement(leftTree)
    assert.equal(initCount, 1, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff_diff(leftTree, rightTree)
    assert.equal(patchcount_patchCount(patches), 1)
    assert.equal(initCount, 1, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch_patch(domNode, patches)
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 1, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = createelement_createElement(rightTree)
    assert.equal(newRoot, domNode)
    assertequaldom_assertEqualDom(assert, newRoot, expectedNode)
    assert.end()
})

ext_test("Patch nested widgets", function (assert) {
    var initCount = 0
    var updateCount = 0
    var leftState = { a: 1 }
    var rightState = { a: 2 }
    var domNode

    function Widget(state) {
        this.state = state
        this.vdom = this.render(state)
    }

    Widget.prototype.init = function () {
        initCount++
        return createelement_createElement(this.vdom);
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        assert.equal(this.state, rightState)
        assert.equal(leftNode.state, leftState)
        assert.equal(dom, domNode.childNodes[1].childNodes[0])
        patch_patch(dom, diff_diff(leftNode.vdom, this.vdom))
    }

    Widget.prototype.render = function (state) {
        return h_h("div", "" + state.a);
    }

    Widget.prototype.type = "Widget"

    var leftWidget = new Widget(leftState)
    var rightWidget = new Widget(rightState)

    var leftTree = h_h("div", [
        h_h("span", "text"),
        h_h("div.widgetContainer", [
            leftWidget
        ]),
        h_h("p", "more text")
    ])

    var rightTree = h_h("div", [
        h_h("span", "text"),
        h_h("div.widgetContainer", [
            rightWidget
        ]),
        h_h("p", "more text")
    ])

    domNode = createelement_createElement(leftTree)
    assert.equal(initCount, 1, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff_diff(leftTree, rightTree)
    assert.equal(patchcount_patchCount(patches), 1)
    assert.equal(initCount, 1, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch_patch(domNode, patches)
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 1, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = createelement_createElement(rightTree)
    assert.equal(newRoot, domNode)
    assertequaldom_assertEqualDom(assert, newRoot, expectedNode)
    assert.end()
})

ext_test("Can replace stateful widget with vnode", function (assert) {
    var statefulWidget  = {
        init: function () {
            return createelement_createElement(h_h("div.widget"));
        },
        update: function () {},
        destroy: function () {},
        type: "Widget"
    }

    var leftNode = h_h("div", statefulWidget)
    var rightNode = h_h("div", h_h("div.vnode"))

    var rootNode = createelement_createElement(leftNode)

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].className, 'widget')

    var patches = diff_diff(leftNode, rightNode)

    var newRoot = patch_patch(rootNode, patches)

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].className, 'vnode')

    assert.end()
})

ext_test("Can replace vnode with stateful widget with vnode", function (assert) {
    var statefulWidget  = {
        init: function () {
            return createelement_createElement(h_h("div.widget"));
        },
        update: function () {},
        destroy: function () {},
        type: "Widget"
    }

    var leftNode = h_h("div", h_h("div.vnode"))
    var rightNode = h_h("div", statefulWidget)

    var rootNode = createelement_createElement(leftNode)

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].className, 'vnode')

    var patches = diff_diff(leftNode, rightNode)

    var newRoot = patch_patch(rootNode, patches)

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].className, 'widget')

    assert.end()
})

ext_test("Ensure children are not rendered more than once", function (assert) {
    var initCount = 0
    var updateCount = 0
    var rightState = { a: 1 }
    var domNode

    function Widget(state) {
        this.state = state
        this.vdom = this.render(state)
    }

    Widget.prototype.init = function () {
        initCount++
        return createelement_createElement(this.vdom);
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        patch_patch(dom, diff_diff(leftNode.vdom, this.vdom))
    }

    Widget.prototype.render = function (state) {
        return h_h("div", "" + state.a);
    }

    Widget.prototype.type = "Widget"

    var rightWidget = new Widget(rightState)

    var leftTree = h_h("div.container", [
        h_h("div")
    ])

    var rightTree = h_h("div.container", [
        h_h("section.widgetContainer", rightWidget)
    ])

    domNode = createelement_createElement(leftTree)
    assert.equal(initCount, 0, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff_diff(leftTree, rightTree)
    assert.equal(patchcount_patchCount(patches), 1)
    assert.equal(initCount, 0, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch_patch(domNode, patches)
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 0, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = createelement_createElement(rightTree)
    assert.equal(newRoot, domNode)
    assertequaldom_assertEqualDom(assert, newRoot, expectedNode)
    assert.end()
})

ext_test("VNode indicates stateful sibling", function (assert) {
    var statefulWidget  = {
        init: function () {},
        update: function () {},
        destroy: function () {},
        type: "Widget"
    }

    var pureWidget = {
        init: function () {},
        update: function () {},
        type: "Widget"
    }

    var stateful = h_h("div", [statefulWidget])
    var pure = h_h("div", [pureWidget])

    assert.ok(stateful.hasWidgets)
    assert.notOk(pure.hasWidgets)
    assert.end()
})

ext_test("Replacing stateful widget with vnode calls destroy", function (assert) {
    var count = 0
    var statefulWidget  = {
        init: function () {},
        update: function () {},
        destroy: function () {
            count++
        },
        type: "Widget"
    }

    var rootNode = createelement_createElement(h_h("div"))
    patch_patch(rootNode, diff_diff(statefulWidget, h_h("div")))
    assert.equal(count, 1)
    assert.end()
})

ext_test("Replacing stateful widget with stateful widget", function (assert) {
    var count = 0
    var statefulWidget  = {
        init: function () {},
        update: function () {},
        destroy: function () {
            count++
        },
        type: "Widget"
    }

    var newWidget = {
        init: function () {},
        update: function () {},
        destroy: function () {
            count = 10000000
        },
        type: "Widget"
    }

    var rootNode = createelement_createElement(h_h("div"))
    var patches = diff_diff(statefulWidget, newWidget)
    patch_patch(rootNode, patches)
    assert.equal(count, 1)
    assert.end()
})

ext_test("Replacing stateful widget with pure widget", function (assert) {
    var count = 0
    var statefulWidget  = {
        init: function () {},
        update: function () {},
        destroy: function () {
            count++
        },
        type: "Widget"
    }

    var newWidget = {
        init: function () {},
        update: function () {},
        type: "Widget"
    }

    var rootNode = createelement_createElement(h_h("div"))
    patch_patch(rootNode, diff_diff(statefulWidget, newWidget))
    assert.equal(count, 1)
    assert.end()
})

ext_test("Removing stateful widget calls destroy", function (assert) {
    var count = 0
    var statefulWidget  = {
        init: function () {},
        update: function () {},
        destroy: function () {
            count++
        },
        type: "Widget"
    }

    var rootNode = createelement_createElement(h_h("div"))
    patch_patch(rootNode, diff_diff(statefulWidget, null))
    assert.equal(count, 1)
    assert.end()
})

ext_test("Patching parent destroys stateful sibling", function (assert) {
    var count = 0
    var widgetRoot = createelement_createElement(h_h("span"))
    var statefulWidget  = {
        init: function () {
            return widgetRoot
        },
        update: function () {
            assert.error()
        },
        destroy: function (domNode) {
            assert.equal(domNode, widgetRoot)
            count++
        },
        type: "Widget"
    }

    var deepTree = h_h("div", [
        "hello",
        h_h("span", "test"),
        h_h("div", [
            h_h("article", [statefulWidget])
        ]),
        h_h("div", [
            h_h("div", "test")
        ])
    ])

    var rootNode

    rootNode = createelement_createElement(deepTree)
    patch_patch(rootNode, diff_diff(deepTree, null))
    assert.equal(count, 1)

    rootNode = createelement_createElement(deepTree)
    patch_patch(rootNode, diff_diff(deepTree, h_h("span")))
    assert.equal(count, 2)

    rootNode = createelement_createElement(deepTree)
    patch_patch(rootNode, diff_diff(deepTree, h_h("div")))
    assert.equal(count, 3)

    assert.end()
})

ext_test("Widget update can replace domNode", function (assert) {
    var widgetInit = createelement_createElement(h_h("span.init"))
    var widgetUpdate = createelement_createElement(h_h("span.update"))

    function Widget () {}
    Widget.prototype.init = function () {
        return widgetInit
    }
    Widget.prototype.update = function () {
        return widgetUpdate
    }
    Widget.prototype.destroy = function () {}
    Widget.prototype.type = "Widget"

    var initTree = h_h("div.init", [new Widget])
    var updateTree = h_h("div.update", [new Widget])
    var rootNode

    rootNode = createelement_createElement(initTree)
    assert.equal(rootNode.childNodes[0], widgetInit)

    patch_patch(rootNode, diff_diff(initTree, updateTree))

    assert.equal(rootNode.childNodes[0], widgetUpdate)
    assert.end()
})

ext_test("Destroy widget nested in removed thunk", function (assert) {
    var count = 0
    var widgetRoot = createelement_createElement(h_h(".widget"))
    var statefulWidget  = {
        init: function () {
            return widgetRoot
        },
        update: function () {
            assert.error()
        },
        destroy: function (domNode) {
            assert.equal(domNode, widgetRoot)
            count++
        },
        type: "Widget"
    }
    var vnode = h_h(".wrapper", statefulWidget)

    function Thunk() {}

    Thunk.prototype.render = function () {
        return vnode
    }

    Thunk.prototype.type = "Thunk"

    var thunkTree = h_h(".page", [
        h_h(".section", [
            new Thunk()
        ])
    ])

    var empty = h_h(".empty")

    var rootNode = createelement_createElement(thunkTree)
    patch_patch(rootNode, diff_diff(thunkTree, empty))
    assert.equal(count, 1)

    assert.end()
})

ext_test("Create element respects namespace", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var svgURI = "http://www.w3.org/2000/svg"
    var vnode = new Node("svg", {}, [], null, svgURI)
    var node = createelement_createElement(vnode)

    assert.equal(node.tagName, "svg")
    assert.equal(node.namespaceURI, svgURI)
    assert.end()
})

ext_test("Different namespaces creates a patch", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var leftNode = new Node("div", {}, [], null, "testing")
    var rightNode = new Node("div", {}, [], null, "undefined")

    var rootNode = createelement_createElement(leftNode)
    assert.equal(rootNode.tagName, "div")
    assert.equal(rootNode.namespaceURI, "testing")

    var patches = diff_diff(leftNode, rightNode)
    assert.equal(patchcount_patchCount(patches), 1)

    rootNode = patch_patch(rootNode, patches)

    assert.equal(rootNode.tagName, "div")
    assert.equal(rootNode.namespaceURI, "undefined")

    assert.end()
})

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = createelement_createElement(h_h())
    node.style[name] = value
    return node.style[name]
}

// Determine if namespace is supported by the DOM
function supportsNamespace() {
    var node = createelement_createElement(h_h())
    return 'namespaceURI' in node;
}

