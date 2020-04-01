import test from "tape";
import { h as h_hjs } from "../h.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";
import { createElement as createelement_createElementjs } from "../create-element.js";
import { VirtualNode as vnodevnode_VirtualNodejs } from "../vnode/vnode";
import { VirtualText as vnodevtext_VirtualTextjs } from "../vnode/vtext";
import { versionjs as vnodeversion_versionjsjs } from "../vnode/version";
import { assertEqualDom as libassertequaldom_assertEqualDomjs } from "./lib/assert-equal-dom.js";
import { patchCount as libpatchcount_patchCountjs } from "./lib/patch-count.js";



// VirtualNode tests
test("Node is a function", function (assert) {
    assert.equal(typeof vnodevnode_VirtualNodejs, "function")
    assert.end()
})

test("Node type and version are set", function (assert) {
    assert.equal(vnodevnode_VirtualNodejs.prototype.type, "VirtualNode")
    assert.deepEqual(vnodevnode_VirtualNodejs.prototype.version, vnodeversion_versionjsjs)
    assert.end()
})

test("TextNode is a function", function (assert) {
    assert.equal(typeof vnodevtext_VirtualTextjs, "function")
    assert.end()
})

test("TextNode type and version are set", function (assert) {
    assert.equal(vnodevtext_VirtualTextjs.prototype.type, "VirtualText")
    assert.deepEqual(vnodevtext_VirtualTextjs.prototype.version, vnodeversion_versionjsjs)
    assert.end()
})

// h tests

test("h is a function", function (assert) {
    assert.equal(h_hjs, "function")
    assert.end()
})

test("defaults to div node", function (assert) {
    var node = h_hjs
    assertNode(assert, node, "DIV")
    assert.end()
})

test("can use class selector", function (assert) {
    var node = h_hjs
    assertNode(assert, node, "DIV", { className: "pretty" })
    assert.end()
})

test("can use non-ascii class selector", function (assert) {
    var node = h_hjs
    assertNode(assert, node, "DIV", { className: "ΑΒΓΔΕΖ" })
    assert.end()
})

test("class selectors combine with className property", function (assert) {
    var node = h_hjs
    assertNode(assert, node, "DIV", { className: "very pretty" })
    assert.end()
})

test("can use id selector", function (assert) {
    var node = h_hjs
    assertNode(assert, node, "DIV", { id: "important" })
    assert.end()
})

test("can use non-ascii id selector", function (assert) {
    var node = h_hjs
    assertNode(assert, node, "DIV", { id: "ΑΒΓΔΕΖ" })
    assert.end()
})

test("properties id overrides selector id", function (assert) {
    var node = h_hjs
    assertNode(assert, node, "DIV", { id: "important" })
    assert.end()
})

test("defaults to div when using selectors", function (assert) {
    var node1 = h_hjs
    var node2 = h_hjs
    var node3 = h_hjs
    var node4 = h_hjs

    assertNode(assert, node1, "DIV", { id: "important" })
    assertNode(assert, node2, "DIV", { className: "pretty" })
    assertNode(assert, node3, "DIV", { id: "important", className: "pretty" })
    assertNode(assert, node4, "DIV", { id: "important", className: "pretty" })
    assert.end()
})

test("second argument can be children", function (assert) {
    var node1 = h_hjs
    var node2 = h_hjs
    var node3 = h_hjs
    var node4 = h_hjs

    var props = { id: "important", className: "pretty" }

    assertNode(assert, node1, "DIV", props, ["test"])
    assertNode(assert, node2, "DIV", props, ["test"])
    assertNode(assert, node3, "DIV", props, [["P", {}, ["testing"]]])
    assertNode(assert, node4, "DIV", props, [["P", {}, ["testing"]]])
    assert.end()
})

test("third argument can be child or children", function (assert) {
    var node1 = h_hjs
    var node2 = h_hjs
    var node3 = h_hjs
    var node4 = h_hjs

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

    assert.ok(node instanceof vnodevnode_VirtualNodejs, "node is a VirtualNode")
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
test("render is a function", function (assert) {
    assert.equal(h_hjs, "function")
    assert.end()
})

test("render text node", function (assert) {
    var vdom = h_hjs
    var dom = createelement_createElementjs
    assert.equal(dom.tagName, "SPAN")
    assert.notOk(dom.id)
    assert.notOk(dom.className)
    assert.equal(dom.childNodes.length, 1)
    assert.equal(dom.childNodes[0].data, "hello")
    assert.end()
})

test("render div", function (assert) {
    var vdom = h_hjs
    var dom = createelement_createElementjs
    assert.notOk(dom.id)
    assert.notOk(dom.className)
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("node id is applied correctly", function (assert) {
    var vdom = h_hjs
    var dom = createelement_createElementjs
    assert.equal(dom.id, "important")
    assert.notOk(dom.className)
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("node class name is applied correctly", function (assert) {
    var vdom = h_hjs
    var dom = createelement_createElementjs
    assert.notOk(dom.id)
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("mixture of node/classname applied correctly", function (assert) {
    var vdom = h_hjs
    var dom = createelement_createElementjs
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "very pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("style object is applied correctly", function (assert) {
    var vdom = h_hjs
    var dom = createelement_createElementjs
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.border, style("border", "1px solid rgb(0, 0, 0)"))
    assert.equal(dom.style.padding, style("padding", "2px"))
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("children are added", function (assert) {
    var vdom = h_hjs

    var dom = createelement_createElementjs

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

test("incompatible children are ignored", function (assert) {
    var vdom = h_hjs
    var dom = createelement_createElementjs
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.cssText, style("cssText", "color: red;"))
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("injected document object is used", function (assert) {
    var vdom = h_hjs
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
    createelement_createElementjs
    assert.equal(count, 3)
    assert.end()
})

test("injected warning is used", function (assert) {
    var badObject = {}
    var vdom = h_hjs

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

    var dom = createelement_createElementjs
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.cssText, style("cssText", "color: red;"))
    assert.equal(dom.childNodes.length, 0)
    assert.equal(i, 2)
    assert.end()
})

// Complete patch tests
test("textnode update test", function (assert) {
    var hello = h_hjs
    var goodbye = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})

test("textnode replace test", function (assert) {
    var hello = h_hjs
    var goodbye = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})

test("textnode insert test", function (assert) {
    var hello = h_hjs
    var again = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})

test("textnode remove", function (assert) {
    var again = h_hjs
    var hello = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})

test("dom node update test", function (assert) {
    var hello = h_hjs
    var goodbye = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})

test("dom node replace test", function (assert) {
    var hello = h_hjs
    var goodbye = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})

test("dom node insert", function (assert) {
    var hello = h_hjs
    var again = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})

test("dom node remove", function (assert) {
    var hello = h_hjs
    var again = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)
    assert.end()
})


test("reuse dom node without breaking", function (assert) {
    var hSpan = h_hjs
    var hello = h_hjs
    var goodbye = h_hjs
    var rootNode = createelement_createElementjs
    var equalNode = createelement_createElementjs
    var patches = diff_diffjs
    var newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, equalNode)

    // Undo the rendering with new trees
    hello = h_hjs
    goodbye = h_hjs
    patches = diff_diffjs
    newRoot = patch_patchjs
    libassertequaldom_assertEqualDomjs(assert, newRoot, rootNode)

    assert.end()
})

test("Allow empty textnode", function (assert) {
    var empty = h_hjs
    var rootNode = createelement_createElementjs
    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].data, "")
    assert.end()
})

test("Can replace vnode with vtext", function (assert) {

    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createelement_createElementjs

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].nodeType, 1)

    var patches = diff_diffjs

    var newRoot = patch_patchjs

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].nodeType, 3)

    assert.end()
})

// Widget tests
test("Widget is initialised on render", function (assert) {
    var initCount = 0
    var testNode = createelement_createElementjs
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

    var result = createelement_createElementjs

    assert.equal(initCount, 1)
    assert.equal(result, testNode)
    assert.end()
})

test("Nested widget is initialised on render", function (assert) {
    var initCount = 0
    var testNode = createelement_createElementjs
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

    var vdom = h_hjs

    var result = createelement_createElementjs

    assert.equal(initCount, 1)
    assert.equal(result.childNodes[1].childNodes[0], testNode)
    assert.end()
})

test("Patch widgets at the root", function (assert) {
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
        return createelement_createElementjs;
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        assert.equal(this.state, rightState)
        assert.equal(leftNode.state, leftState)
        assert.equal(dom, domNode)
        patch_patchjs
    }

    Widget.prototype.render = function (state) {
        return h_hjs;
    }

    Widget.prototype.type = "Widget"

    var leftTree = new Widget(leftState)
    var rightTree = new Widget(rightState)
    domNode = createelement_createElementjs
    assert.equal(initCount, 1, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff_diffjs
    assert.equal(libpatchcount_patchCountjs(patches), 1)
    assert.equal(initCount, 1, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch_patchjs
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 1, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = createelement_createElementjs
    assert.equal(newRoot, domNode)
    libassertequaldom_assertEqualDomjs(assert, newRoot, expectedNode)
    assert.end()
})

test("Patch nested widgets", function (assert) {
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
        return createelement_createElementjs;
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        assert.equal(this.state, rightState)
        assert.equal(leftNode.state, leftState)
        assert.equal(dom, domNode.childNodes[1].childNodes[0])
        patch_patchjs
    }

    Widget.prototype.render = function (state) {
        return h_hjs;
    }

    Widget.prototype.type = "Widget"

    var leftWidget = new Widget(leftState)
    var rightWidget = new Widget(rightState)

    var leftTree = h_hjs

    var rightTree = h_hjs

    domNode = createelement_createElementjs
    assert.equal(initCount, 1, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff_diffjs
    assert.equal(libpatchcount_patchCountjs(patches), 1)
    assert.equal(initCount, 1, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch_patchjs
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 1, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = createelement_createElementjs
    assert.equal(newRoot, domNode)
    libassertequaldom_assertEqualDomjs(assert, newRoot, expectedNode)
    assert.end()
})

test("Can replace stateful widget with vnode", function (assert) {
    var statefulWidget  = {
        init: function () {
            return createelement_createElementjs;
        },
        update: function () {},
        destroy: function () {},
        type: "Widget"
    }

    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createelement_createElementjs

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].className, 'widget')

    var patches = diff_diffjs

    var newRoot = patch_patchjs

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].className, 'vnode')

    assert.end()
})

test("Can replace vnode with stateful widget with vnode", function (assert) {
    var statefulWidget  = {
        init: function () {
            return createelement_createElementjs;
        },
        update: function () {},
        destroy: function () {},
        type: "Widget"
    }

    var leftNode = h_hjs
    var rightNode = h_hjs

    var rootNode = createelement_createElementjs

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].className, 'vnode')

    var patches = diff_diffjs

    var newRoot = patch_patchjs

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].className, 'widget')

    assert.end()
})

test("Ensure children are not rendered more than once", function (assert) {
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
        return createelement_createElementjs;
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        patch_patchjs
    }

    Widget.prototype.render = function (state) {
        return h_hjs;
    }

    Widget.prototype.type = "Widget"

    var rightWidget = new Widget(rightState)

    var leftTree = h_hjs

    var rightTree = h_hjs

    domNode = createelement_createElementjs
    assert.equal(initCount, 0, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff_diffjs
    assert.equal(libpatchcount_patchCountjs(patches), 1)
    assert.equal(initCount, 0, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch_patchjs
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 0, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = createelement_createElementjs
    assert.equal(newRoot, domNode)
    libassertequaldom_assertEqualDomjs(assert, newRoot, expectedNode)
    assert.end()
})

test("VNode indicates stateful sibling", function (assert) {
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

    var stateful = h_hjs
    var pure = h_hjs

    assert.ok(stateful.hasWidgets)
    assert.notOk(pure.hasWidgets)
    assert.end()
})

test("Replacing stateful widget with vnode calls destroy", function (assert) {
    var count = 0
    var statefulWidget  = {
        init: function () {},
        update: function () {},
        destroy: function () {
            count++
        },
        type: "Widget"
    }

    var rootNode = createelement_createElementjs
    patch_patchjs
    assert.equal(count, 1)
    assert.end()
})

test("Replacing stateful widget with stateful widget", function (assert) {
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

    var rootNode = createelement_createElementjs
    var patches = diff_diffjs
    patch_patchjs
    assert.equal(count, 1)
    assert.end()
})

test("Replacing stateful widget with pure widget", function (assert) {
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

    var rootNode = createelement_createElementjs
    patch_patchjs
    assert.equal(count, 1)
    assert.end()
})

test("Removing stateful widget calls destroy", function (assert) {
    var count = 0
    var statefulWidget  = {
        init: function () {},
        update: function () {},
        destroy: function () {
            count++
        },
        type: "Widget"
    }

    var rootNode = createelement_createElementjs
    patch_patchjs
    assert.equal(count, 1)
    assert.end()
})

test("Patching parent destroys stateful sibling", function (assert) {
    var count = 0
    var widgetRoot = createelement_createElementjs
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

    var deepTree = h_hjs

    var rootNode

    rootNode = createelement_createElementjs
    patch_patchjs
    assert.equal(count, 1)

    rootNode = createelement_createElementjs
    patch_patchjs
    assert.equal(count, 2)

    rootNode = createelement_createElementjs
    patch_patchjs
    assert.equal(count, 3)

    assert.end()
})

test("Widget update can replace domNode", function (assert) {
    var widgetInit = createelement_createElementjs
    var widgetUpdate = createelement_createElementjs

    function Widget () {}
    Widget.prototype.init = function () {
        return widgetInit
    }
    Widget.prototype.update = function () {
        return widgetUpdate
    }
    Widget.prototype.destroy = function () {}
    Widget.prototype.type = "Widget"

    var initTree = h_hjs
    var updateTree = h_hjs
    var rootNode

    rootNode = createelement_createElementjs
    assert.equal(rootNode.childNodes[0], widgetInit)

    patch_patchjs

    assert.equal(rootNode.childNodes[0], widgetUpdate)
    assert.end()
})

test("Destroy widget nested in removed thunk", function (assert) {
    var count = 0
    var widgetRoot = createelement_createElementjs
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
    var vnode = h_hjs

    function Thunk() {}

    Thunk.prototype.render = function () {
        return vnode
    }

    Thunk.prototype.type = "Thunk"

    var thunkTree = h_hjs

    var empty = h_hjs

    var rootNode = createelement_createElementjs
    patch_patchjs
    assert.equal(count, 1)

    assert.end()
})

test("Create element respects namespace", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var svgURI = "http://www.w3.org/2000/svg"
    var vnode = new vnodevnode_VirtualNodejs("svg", {}, [], null, svgURI)
    var node = createelement_createElementjs

    assert.equal(node.tagName, "svg")
    assert.equal(node.namespaceURI, svgURI)
    assert.end()
})

test("Different namespaces creates a patch", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var leftNode = new vnodevnode_VirtualNodejs("div", {}, [], null, "testing")
    var rightNode = new vnodevnode_VirtualNodejs("div", {}, [], null, "undefined")

    var rootNode = createelement_createElementjs
    assert.equal(rootNode.tagName, "div")
    assert.equal(rootNode.namespaceURI, "testing")

    var patches = diff_diffjs
    assert.equal(libpatchcount_patchCountjs(patches), 1)

    rootNode = patch_patchjs

    assert.equal(rootNode.tagName, "div")
    assert.equal(rootNode.namespaceURI, "undefined")

    assert.end()
})

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = createelement_createElementjs
    node.style[name] = value
    return node.style[name]
}

// Determine if namespace is supported by the DOM
function supportsNamespace() {
    var node = createelement_createElementjs
    return 'namespaceURI' in node;
}

