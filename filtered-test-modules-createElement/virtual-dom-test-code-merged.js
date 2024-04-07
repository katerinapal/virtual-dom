var test = require("tape")
var doc = require("global/document")

var attributeHook = require("../virtual-hyperscript/hooks/attribute-hook.js");
var h = require("../virtual-hyperscript/index.js");
var createElement = require("../vdom/create-element")
var patch = require("../vdom/patch")
var diff = require("../vtree/diff")

test("sets and removes namespaced attribute", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = attributeHook(namespace, 'first value')
    var hook2 = attributeHook(namespace, 'first value')
    var hook3 = attributeHook(namespace, 'second value')

    var first = h('div', {'myns:myattr': hook1})
    var second = h('div', {'myns:myattr': hook2})
    var third = h('div', {'myns:myattr': hook3})
    var fourth = h('div', {})

    var elem = createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value')

    var patches = diff(first, second)
    patch(elem, patches)
    // The value shouldn't change.
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value')

    patches = diff(second, third)
    patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'second value')

    patches = diff(third, fourth)
    patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    assert.end()
})

test("sets the attribute if previous value was not an AttributeHook", function (assert) {
    var namespace = 'http://ns.com/my'

    var OtherHook = function(namespace, value) {
        this.namespace = namespace
        this.value = value
    }
    OtherHook.prototype.hook = function() {}

    var hook1 = new OtherHook(namespace, 'the value')
    var hook2 = attributeHook(namespace, 'the value')

    var first = h('div', {'myns:myattr': hook1})
    var second = h('div', {'myns:myattr': hook2})

    var elem = createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    patches = diff(first, second)
    patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    assert.end()
})

test("sets the attribute if previous value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = attributeHook('http://other.ns/', 'the value')
    var hook2 = attributeHook(namespace, 'the value')

    var first = h('div', {'myns:myattr': hook1})
    var second = h('div', {'myns:myattr': hook2})

    var elem = createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    patches = diff(first, second)
    patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    assert.end()
})

test("removes the attribute if next value is not an AttributeHook", function (assert) {
    var namespace = 'http://ns.com/my'

    var OtherHook = function(namespace, value) {
        this.namespace = namespace
        this.value = value
    }
    OtherHook.prototype.hook = function() {}

    var hook1 = attributeHook(namespace, 'the value')
    var hook2 = new OtherHook(namespace, 'the value')

    var first = h('div', {'myns:myattr': hook1})
    var second = h('div', {'myns:myattr': hook2})

    var elem = createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    patches = diff(first, second)
    patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    assert.end()
})

test("removes the attribute if next value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = attributeHook(namespace, 'the value')
    var hook2 = attributeHook('http://other.ns/', 'the value')

    var first = h('div', {'myns:myattr': hook1})
    var second = h('div', {'myns:myattr': hook2})

    var elem = createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    patches = diff(first, second)
    patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    assert.end()
})

function blankAttributeNS() {
    // Most browsers conform to the latest version of the DOM spec,
    // which requires `getAttributeNS` to return `null` when the attribute
    // doesn't exist, but some browsers (including phantomjs) implement the
    // old version of the spec and return an empty string instead, see:
    // https://developer.mozilla.org/en-US/docs/Web/API/element.getAttributeNS#Return_value
    var div = doc.createElement("div")
    return div.getAttributeNS(null, "foo")
}


var test = require("tape")
var VNode = require("../vnode/vnode")
var VText = require("../vnode/vtext")
var diff = require("../vtree/diff")

var createElement = require("../create-element")
var patch = require("../patch")

test("indexing over thunk root", function (assert) {
    var leftThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className:"test"
            }, [new VText("Left")])
        }
    }

    var rightThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className: "test"
            }, [new VText("Right")])
        }
    }

    var root = createElement(leftThunk)
    var patches = diff(leftThunk, rightThunk)
    var newRoot = patch(root, patches)

    assert.equal(newRoot.childNodes[0].data, "Right")
    assert.end()
})

test("indexing over thunk child", function (assert) {
    var leftNode = new VNode("div", {
        className: "parent-node"
    }, [
        new VNode("div"),
        new VText("test"),
        {
            type: "Thunk",
            render: function () {
                return new VNode("div", {
                    className:"test"
                }, [new VText("Left")])
            }
        },
        new VNode("div"),
        new VText("test")
    ])

    var rightNode = new VNode("div", {
        className: "parent-node"
    }, [
        new VNode("div"),
        new VText("test"),
        {
            type: "Thunk",
            render: function () {
                return new VNode("div", {
                    className:"test"
                }, [new VText("Right")])
            }
        },
        new VNode("div"),
        new VText("test")
    ])

    var root = createElement(leftNode)
    var patches = diff(leftNode, rightNode)
    patch(root, patches)
    assert.equal(root.childNodes[2].childNodes[0].data, "Right")
    assert.end()
})


var test = require("tape")
var EvStore = require("ev-store")

var h = require("../virtual-hyperscript/index.js")
var createElement = require("../vdom/create-element")
var patch = require("../vdom/patch")
var diff = require("../vtree/diff")

test("h with events", function (assert) {
    function one() {}

    var left = h(".foo", {
        "ev-click": one
    })

    var right = h(".bar", {})

    var elem = createElement(left)

    var ds1 = EvStore(elem)
    assert.ok(ds1)
    assert.equal(ds1.click, one)

    var patches = diff(left, right)

    patch(elem, patches)

    var ds2 = EvStore(elem)
    assert.ok(ds2)
    assert.equal(ds1, ds2)
    assert.equal(ds2.click, undefined)

    assert.end()
})


var test = require("tape")
var h = require("../h.js")
var diff = require("../diff.js")
var patch = require("../patch.js")
var createElement = require("../create-element.js")

test("coerce numbers to strings in children array", function (assert) {
    var leftNode = h("div", [ "clicked ", 1336, " times" ])
    var rightNode = h("div", [ "clicked ", 1337, " times" ])
    var rootNode = createElement(leftNode)
    var newRoot = patch(rootNode, diff(leftNode, rightNode))
    assert.equal(newRoot.toString(), '<div>clicked 1337 times</div>')
    assert.end()
})


var test = require("tape")
var VNode = require("../vnode/vnode")
var VText = require("../vnode/vtext")
var diff = require("../vtree/diff")
var document = require("global/document")

var createElement = require("../create-element")
var patch = require("../patch")

var createElementCustom = function(vnode) {
    var created = createElement(vnode)
    created.customCreation = true
    return created
}

function assertPachedNodeIsMarked(leftNode, rightNode, assert) {
    var root = createElementCustom(leftNode)
    var patches = diff(leftNode, rightNode)
    var newRoot = patch(root, patches, { render: createElementCustom })
    assert.equal(newRoot.childNodes[0].customCreation, true)
    assert.end()
}

test("overrided createElement is used on node insertion", function (assert) {
    var leftNode = new VNode("div")
    var rightNode = new VNode("div", {}, [new VNode("div")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

test("overrided createElement is used for patching vnodes", function (assert) {
    var leftNode = new VNode("div", {}, [new VNode("div")])
    var rightNode = new VNode("div", {}, [new VNode("span")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

test("overrided createElement is used for patching text nodes", function (assert) {
    var leftNode = new VNode("div", {}, [new VNode("div")])
    var rightNode = new VNode("div", {}, [new VText("hello")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

test("overrided createElement is used for patching widget nodes", function (assert) {
    var Widget = function (){}
    Widget.prototype.type = "Widget"
    Widget.prototype.init = function(){ return document.createElement("div") }
    Widget.prototype.update = function(previous, domNode){ return null }
    Widget.prototype.destroy = function(domNode){}

    var leftNode = new VNode("div", {}, [new VNode("div")])
    var rightNode = new VNode("div", {}, [new Widget()])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})


var test = require("tape")

var h = require("../h.js")
var createElement = require("../create-element.js")
var diff = require("../diff.js")
var patch = require("../patch.js")

test("attributes can be set", function (assert) {
    var leftTree = h("div")

    var rightTree = h("div",{
        attributes: {
            src: "test.jpg"
        }
    })

    var rootNode = createElement(leftTree)
    var patches = diff(leftTree, rightTree)

    var newRootNode = patch(rootNode, patches)

    assert.equal(newRootNode.getAttribute("src"), "test.jpg")
    assert.end()
})

test("individual attributes can be unset", function (assert) {
    var leftTree = h("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    })

    var rightTree = h("div", {
        attributes: {
            a: "1",
            c: "3"
        }
    })

    var rootNode = createElement(leftTree)
    var patches = diff(leftTree, rightTree)

    var newRootNode = patch(rootNode, patches)

    assert.equal(newRootNode, rootNode)
    assert.equal(newRootNode.getAttribute("a"), "1")
    assert.ok(newRootNode.getAttribute("b") == null)
    assert.equal(newRootNode.getAttribute("c"), "3")
    assert.end()
})

test("attributes can be completely unset", function (assert) {
    var leftTree = h("div", {
        attributes: {
            a: "1",
            b: "2",
            c: "3"
        }
    })

    var rightTree = h("div")

    var rootNode = createElement(leftTree)
    var patches = diff(leftTree, rightTree)


    var newRootNode = patch(rootNode, patches)

    assert.equal(newRootNode, rootNode)
    assert.ok(newRootNode.getAttribute("a") == null)
    assert.ok(newRootNode.getAttribute("b") == null)
    assert.ok(newRootNode.getAttribute("c") == null)
    assert.end()
})


