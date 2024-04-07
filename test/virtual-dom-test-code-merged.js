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


var test = require("tape")

var h = require("../h.js")
var Node = require("../vnode/vnode.js")
var create = require("../create-element.js")
var diff = require("../diff.js")
var patch = require("../patch.js")
var patchCount = require("./lib/patch-count.js")

test("Stateful hooks are added to a hooks object on a node", function (assert) {
    function StatefulHook() {}
    StatefulHook.prototype.hook = function () {}
    StatefulHook.prototype.unhook = function () {}
    var statefulValue = new StatefulHook()

    function StatelessHook() {}
    StatelessHook.prototype.hook = function () {}
    var statelessValue = new StatelessHook()

    var node = new Node("div", {
        stateful: statefulValue,
        stateless: statelessValue,
        value: "not a hook"
    }, [], null, null)

    assert.equal(node.hooks.stateful, statefulValue)
    assert.equal(node.hooks.stateless, undefined)
    assert.equal(node.descendantHooks, false)
    assert.end()
})

test("Node child stateless hooks are not identified", function (assert) {
    function Prop() {}
    Prop.prototype.hook = function () {}
    var propValue = new Prop()

    var node = new Node("div", {
        "id": propValue,
        "value": "not a hook"
    }, [], undefined, undefined)

    var parentNode = new Node("div", {
        "id": "not a hook"
    }, [node], undefined, undefined)

    assert.equal(node.hooks, undefined)
    assert.equal(parentNode.hooks, undefined)
    assert.notOk(parentNode.descendantHooks)
    assert.end()
})

test("Node child stateful hooks are identified", function (assert) {
    function Prop() {}
    Prop.prototype.hook = function () {}
    Prop.prototype.unhook = function () {}
    var propValue = new Prop()

    var node = new Node("div", {
        "id": propValue,
        "value": "not a hook"
    }, [], undefined, undefined)

    var parentNode = new Node("div", {
        "id": "not a hook"
    }, [node], undefined, undefined)

    assert.equal(node.hooks.id, propValue)
    assert.equal(parentNode.hooks, undefined)
    assert.ok(parentNode.descendantHooks)
    assert.end()
})

test("hooks get called in render", function (assert) {
    var counter = 0
    var vtree = h("div", {
        "some-key": hook(function (elem, prop) {
            counter++
            assert.equal(prop, "some-key")
            assert.equal(elem.tagName, "DIV")

            elem.className = "bar"
        })
    })

    var elem = create(vtree)
    assert.equal(elem.className, "bar")
    assert.equal(counter, 1)

    assert.end()
})

test("functions are not hooks in render", function (assert) {
    var counter = 0
    var fakeHook = function () {
        counter++
    }
    var vtree = h("div", {
        "someProp": fakeHook
    })

    var elem = create(vtree)
    assert.equal(elem.someProp, fakeHook)
    assert.equal(counter, 0)

    assert.end()
})

test("hooks get called in patch", function (assert) {
    var counter = 0
    var prev = h("div")
    var curr = h("div", {
        "some-key": hook(function (elem, prop) {
            counter++
            assert.equal(prop, "some-key")
            assert.equal(elem.tagName, "DIV")

            elem.className = "bar"
        })
    })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.className, "bar")
    assert.equal(counter, 1)

    assert.end()
})

test("hooks are called with DOM node, property name, and previous/next value", function (assert) {
    function Hook(name) {
        this.name = name
        this.hookArgs = []
        this.unhookArgs = []
    }
    Hook.prototype.hook = function() {
      this.hookArgs.push([].slice.call(arguments, 0))
    }
    Hook.prototype.unhook = function() {
      this.unhookArgs.push([].slice.call(arguments, 0))
    }

    var hook1 = new Hook('hook1')
    var hook2 = new Hook('hook2')

    var first = h("div", { id: 'first', hook: hook1 })
    var second = h("div", { id: 'second', hook: hook2 })
    var third = h("div")

    var elem = create(first)
    assert.equal(hook1.hookArgs.length, 1)
    assert.deepEqual(hook1.hookArgs[0], [elem, 'hook', undefined])
    assert.equal(hook1.unhookArgs.length, 0)

    var patches = diff(first, second)
    elem = patch(elem, patches)
    assert.equal(hook2.hookArgs.length, 1)
    assert.deepEqual(hook2.hookArgs[0], [elem, 'hook', hook1])
    assert.equal(hook1.unhookArgs.length, 1)
    assert.deepEqual(hook1.unhookArgs[0], [elem, 'hook', hook2])

    patches = diff(second, third)
    elem = patch(elem, patches)
    assert.equal(hook2.hookArgs.length, 1)
    assert.equal(hook2.unhookArgs.length, 1)
    assert.deepEqual(hook2.unhookArgs[0], [elem, 'hook', undefined])

    assert.end()
})

test("functions are not hooks in render", function (assert) {
    var counter = 0
    var fakeHook = function () {
        counter++
    }

    var prev = h("div")
    var curr = h("div", { someProp: fakeHook })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.someProp, fakeHook)
    assert.equal(counter, 0)

    assert.end()
})

test("two different hooks", function (assert) {
    var counters = { a: 0, b: 0 }
    var prev = h("div", { propA: hook(function () {
        counters.a++
    }) })
    var curr = h("div", { propB: hook(function () {
        counters.b++
    }) })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.propA, undefined)
    assert.equal(elem.propB, null)
    assert.equal(counters.a, 1)
    assert.equal(counters.b, 1)

    assert.end()
})

test("two hooks on same property", function (assert) {
    var counters = { a: 0, b: 0 }
    var prev = h("div", { propA: hook(function () {
        counters.a++
    }) })
    var curr = h("div", { propA: hook(function () {
        counters.b++
    }) })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.propA, undefined)
    assert.equal(counters.a, 1)
    assert.equal(counters.b, 1)

    assert.end()
})

test("two hooks of same interface", function (assert) {
    function Hook(key) {
        this.key = key
    }
    Hook.prototype.hook = function () {
        counters[this.key]++
    }

    var counters = { a: 0, b: 0 }
    var prev = h("div", { propA: new Hook("a") })
    var curr = h("div", { propA: new Hook("b") })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.propA, undefined)
    assert.equal(counters.a, 1, "counters.a")
    assert.equal(counters.b, 1, "counters.b")

    assert.end()
})

test("hooks are not called on trivial diff", function (assert) {
    var counters = {
        a: 0,
        b: 0,
        c: 0
    }

    var vnode = h("div", {
        test: hook(function () {
            counters.a++
        })
    }, [
        h("div", { test: hook(function () { counters.b++ }) }),
        h("div", { test: hook(function () { counters.c++ }) })
    ])

    var rootNode = create(vnode)
    assert.equal(counters.a, 1, "counters.a")
    assert.equal(counters.b, 1, "counters.b")
    assert.equal(counters.c, 1, "counters.c")

    var patches = diff(vnode, vnode)
    assert.equal(patchCount(patches), 0)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)
    assert.equal(counters.a, 1, "counters.a patch")
    assert.equal(counters.b, 1, "counters.b patch")
    assert.equal(counters.c, 1, "counters.c patch")
    assert.end()
})

test("property-replacing diff calls unhook", function (assert) {
  unhookCallCount = 0

  function zhook(x) {
    this.x = x
  }
  zhook.prototype.hook = function () {
    return null
  }

  zhook.prototype.unhook = function () {
    unhookCallCount += 1
  }

  hooker = new zhook('ONE')
  hooker2 = new zhook('TWO')

  var firstTree = h("div", {roothook: hooker})
  var secondTree = h("div", {roothook: hooker2})
  var thirdTree = h("span")

  var rootNode = create(firstTree)

  var firstPatches = diff(firstTree, secondTree)
  rootNode = patch(rootNode, firstPatches)


  var secondPatches = diff(secondTree, thirdTree)
  rootNode = patch(rootNode, secondPatches)

  assert.strictEqual(unhookCallCount, 2, "Missing unhook calls")

  assert.end()
})

test("unhook-only hook is a valid hook", function (assert) {
    var unhookCalled = false;

    function UnhookHook() {}

    UnhookHook.prototype.unhook = function() {
        unhookCalled = true
    }

    var hook = new UnhookHook()

    var firstTree = h('div', {hook: hook})
    var secondTree = h('div', {})

    var rootNode = create(firstTree)

    assert.notOk(unhookCalled)

    var patches = diff(firstTree, secondTree)
    rootNode = patch(rootNode, patches)

    assert.ok(unhookCalled)
    assert.end()
})

test("all hooks are unhooked", function (assert) {
    var hookCounts = {}
    var unhookCounts = {}

    function Hook(value) {
        if (!(this instanceof Hook)) {
            return new Hook(value)
        }
        this.value = value
    }

    Hook.prototype.hook = function hook() {
        var key = this.value
        if (key in hookCounts) {
            hookCounts[key]++
        } else {
            hookCounts[key] = 1;
        }
    }

    Hook.prototype.unhook = function unhook() {
        var key = this.value;
        if (key in unhookCounts) {
            unhookCounts[key]++
        } else {
            unhookCounts[key] = 1;
        }
    }

    var rootHook = Hook("rootHook")
    var childHookA = Hook("childHookA")
    var childHookB = Hook("childHookB")
    var childHookC = Hook("childHookC")
    var thunkyRootHook = Hook("thunkyRootHook")
    var thunkyChildHookA = Hook("thunkyChildHookA")
    var thunkyChildHookB = Hook("thunkyChildHookB")
    var thunkyChildHookC = Hook("thunkyChildHookC")

    function Thunky() {}

    Thunky.prototype.render = function () {
        return h("div", {
            rootHook: thunkyRootHook
        }, [
            h("div", {
                childHook: thunkyChildHookA
            }),
            h("div", {
                childHook: thunkyChildHookB
            }),
            h("div", {
                childHook: thunkyChildHookC
            })
        ])
    }

    Thunky.prototype.type = "Thunk"


    var firstTree = h("div", {
        rootHook: rootHook
    }, [
        h("div", {
            childHook: childHookA
        }),
        h("div", {
            childHook: childHookB
        }, [
            new Thunky()
        ]),
        h("div", {
            childHook: childHookC
        })
    ])

    var secondTree = h("div", {
        rootHook: rootHook
    }, [
        h("div", {
            childHook: childHookA
        }),
        h("div", {
            childHook: childHookB
        }, [
            new Thunky()
        ]),
        h("div", {
            childHook: childHookC
        })
    ])

    var thirdTree = h('span')

    var rootNode = create(firstTree)

    assertHooked();

    var firstPatches = diff(firstTree, secondTree)

    assertHooked();

    assert.strictEqual(patchCount(firstPatches), 0, "No patches for identical")
    rootNode = patch(rootNode, firstPatches)

    assertHooked();

    var secondPatches = diff(secondTree, thirdTree)

    assertHooked();

    // Expect 1 root patch, 3 unhook patches and a thunk patch
    assert.strictEqual(patchCount(secondPatches), 5, "Expect unhook patches")

    rootNode = patch(rootNode, secondPatches)

    assertUnhooked()

    assert.end()

    function assertHooked() {
        assert.strictEqual(hookCounts.rootHook, 1)
        assert.strictEqual(hookCounts.childHookA, 1)
        assert.strictEqual(hookCounts.childHookB, 1)
        assert.strictEqual(hookCounts.childHookC, 1)
        assert.strictEqual(hookCounts.thunkyRootHook, 1)
        assert.strictEqual(hookCounts.thunkyChildHookA, 1)
        assert.strictEqual(hookCounts.thunkyChildHookB, 1)
        assert.strictEqual(hookCounts.thunkyChildHookC, 1)
        assert.strictEqual(unhookCounts.rootHook, undefined)
        assert.strictEqual(unhookCounts.childHookA, undefined)
        assert.strictEqual(unhookCounts.childHookB, undefined)
        assert.strictEqual(unhookCounts.childHookC, undefined)
        assert.strictEqual(unhookCounts.thunkyRootHook, undefined)
        assert.strictEqual(unhookCounts.thunkyChildHookA, undefined)
        assert.strictEqual(unhookCounts.thunkyChildHookB, undefined)
        assert.strictEqual(unhookCounts.thunkyChildHookC, undefined)
    }

    function assertUnhooked() {
        assert.strictEqual(hookCounts.rootHook, 1)
        assert.strictEqual(hookCounts.childHookA, 1)
        assert.strictEqual(hookCounts.childHookB, 1)
        assert.strictEqual(hookCounts.childHookC, 1)
        assert.strictEqual(hookCounts.thunkyRootHook, 1)
        assert.strictEqual(hookCounts.thunkyChildHookA, 1)
        assert.strictEqual(hookCounts.thunkyChildHookB, 1)
        assert.strictEqual(hookCounts.thunkyChildHookC, 1)
        assert.strictEqual(unhookCounts.rootHook, 1)
        assert.strictEqual(unhookCounts.childHookA, 1)
        assert.strictEqual(unhookCounts.childHookB, 1)
        assert.strictEqual(unhookCounts.childHookC, 1)
        assert.strictEqual(unhookCounts.thunkyRootHook, 1)
        assert.strictEqual(unhookCounts.thunkyChildHookA, 1)
        assert.strictEqual(unhookCounts.thunkyChildHookB, 1)
        assert.strictEqual(unhookCounts.thunkyChildHookC, 1)
    }
})

function createAndPatch(prev, curr) {
    var elem = create(prev)
    var patches = diff(prev, curr)
    elem = patch(elem, patches)

    return elem
}

function Type(fn) {
    this.fn = fn
}

Type.prototype.hook = function () {
    this.fn.apply(this, arguments)
}

function hook(fn) {
    return new Type(fn)
}


require("./main.js")
require("./hook.js")
require("./nested-properties.js")
require("./undefined-properties.js")
require("./keys.js")
require("./thunk.js")
require("./style.js")
require("./attributes")
require("./non-string.js")

require("../vdom/test/index.js")
require("../vtree/test/index.js")
require("../virtual-hyperscript/test/index.js")
require("../vnode/test/index.js")


var test = require("tape")

var h = require("../h.js")
var diff = require("../diff.js")
var patch = require("../patch.js")
var render = require("../create-element.js")

var patchCount = require("./lib/patch-count.js")
var assertEqualDom = require("./lib/assert-equal-dom.js")
var nodesFromArray = require("./lib/nodes-from-array.js")
var assertChildNodesFromArray = require("./lib/assert-childNodes-from-array.js")

var VPatch = require("../vnode/vpatch.js")

test("keys get reordered", function (assert) {
    var leftNode = nodesFromArray(["1", "2", "3", "4", "test", "6", "good", "7"])
    var rightNode = nodesFromArray(["7", "4", "3", "2", "6", "test", "good", "1"])

    var rootNode = render(leftNode)

    var childNodes = []
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        childNodes.push(rootNode.childNodes[i])
    }

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 1)
    assertReorderEquals(assert, patches, {
        removes: [
            {from: 0, key: '1'},
            {from: 0, key: '2'},
            {from: 1, key: '4'},
            {from: 2, key: '6'},
            {from: 3, key: '7'}
        ],
        inserts: [
            {to: 0, key: '7'},
            {to: 1, key: '4'},
            {to: 3, key: '2'},
            {to: 4, key: '6'},
            {to: 7, key: '1'}
        ]
    })

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, rootNode.childNodes.length)

    assert.equal(newRoot.childNodes[7], childNodes[0])
    assert.equal(newRoot.childNodes[3], childNodes[1])
    assert.equal(newRoot.childNodes[2], childNodes[2])
    assert.equal(newRoot.childNodes[1], childNodes[3])
    assert.equal(newRoot.childNodes[5], childNodes[4])
    assert.equal(newRoot.childNodes[4], childNodes[5])
    assert.equal(newRoot.childNodes[6], childNodes[6])
    assert.equal(newRoot.childNodes[0], childNodes[7])
    assert.end()
})

test("mix keys without keys", function (assert) {
    var leftNode = h("div", [
        h("div", { key: 1 }),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div")
    ])

    var rightNode = h("div", [
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div", { key: 1 })
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 1)
    assertReorderEquals(assert, patches, {
        removes: [{from: 0, key: '1'}],
        inserts: [{to: 7, key: '1'}]
    })

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, rootNode.childNodes.length)

    assert.equal(newRoot.childNodes[0], childNodes[1])
    assert.equal(newRoot.childNodes[1], childNodes[2])
    assert.equal(newRoot.childNodes[2], childNodes[3])
    assert.equal(newRoot.childNodes[3], childNodes[4])
    assert.equal(newRoot.childNodes[4], childNodes[5])
    assert.equal(newRoot.childNodes[5], childNodes[6])
    assert.equal(newRoot.childNodes[6], childNodes[7])
    assert.equal(newRoot.childNodes[7], childNodes[0])
    assert.end()
})

test("avoid unnecessary reordering", function (assert) {
    var leftNode = h("div", [
        h("div"),
        h("div", { key: 1 }),
        h("div")
    ])

    var rightNode = h("div", [
        h("div"),
        h("div", { key: 1 }),
        h("div")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 0)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes[0], childNodes[0])
    assert.equal(newRoot.childNodes[1], childNodes[1])
    assert.equal(newRoot.childNodes[2], childNodes[2])
    assert.end()
})

test("missing key gets replaced", function (assert) {
    var leftNode = h("div", [
        h("div", { key: 1 }),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div")
    ])

    var rightNode = h("div", [
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div"),
        h("div")
    ])

    var rootNode = render(leftNode)

    var childNodes = []
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        childNodes.push(rootNode.childNodes[i])
    }

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 1)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, rootNode.childNodes.length)

    assert.notEqual(newRoot.childNodes[0], childNodes[0])
    assert.equal(newRoot.childNodes[1], childNodes[1])
    assert.equal(newRoot.childNodes[2], childNodes[2])
    assert.equal(newRoot.childNodes[3], childNodes[3])
    assert.equal(newRoot.childNodes[4], childNodes[4])
    assert.equal(newRoot.childNodes[5], childNodes[5])
    assert.equal(newRoot.childNodes[6], childNodes[6])
    assert.equal(newRoot.childNodes[7], childNodes[7])
    assert.end()
})

test("widgets can be keyed", function (assert) {
    function DivWidget(key, state) {
        this.key = key
        this.state = state
    }

    DivWidget.prototype.init = function () {
        return render(h("div", this.state))
    }

    DivWidget.prototype.update = function (rootNode, prev) {
        if (this.state !== prev.state) {
            return render(h("div", this.state))
        }
    }

    DivWidget.prototype.type = "Widget"

    var leftNode = h("div", [
        new DivWidget("1", "a"),
        new DivWidget("2", "b"),
        new DivWidget("3", "c")
    ])

    var rightNode = h("div", [
        new DivWidget("3", "c"),
        new DivWidget("2", "b"),
        new DivWidget("1", "a")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)


    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 4)    // 1 reorder and 3 update patches

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, rootNode.childNodes.length)

    assertEqualDom(assert, newRoot.childNodes[0], childNodes[2])
    assertEqualDom(assert, newRoot.childNodes[1], childNodes[1])
    assertEqualDom(assert, newRoot.childNodes[2], childNodes[0])
    assert.end()
})

test("delete key at the start", function (assert) {
    var leftNode = h("div", [
        h("div", { key: "a" }, "a"),
        h("div", { key: "b" }, "b"),
        h("div", { key: "c" }, "c")
    ])

    var rightNode = h("div", [
        h("div", { key: "b" }, "b"),
        h("div", { key: "c" }, "c")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)
    // just a remove patch
    assert.equal(patchCount(patches), 1)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 2)

    assert.equal(newRoot.childNodes[0], childNodes[1])
    assert.equal(newRoot.childNodes[1], childNodes[2])
    assert.end()
})

test("add key to start", function (assert) {
    var leftNode = h("div", [
        h("div", { key: "b" }, "b"),
        h("div", { key: "c" }, "c")
    ])

    var rightNode = h("div", [
        h("div", { key: "a" }, "a"),
        h("div", { key: "b" }, "b"),
        h("div", { key: "c" }, "c")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 1)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 3)

    assert.equal(newRoot.childNodes[1], childNodes[0])
    assert.equal(newRoot.childNodes[2], childNodes[1])
    assert.end()
})

test("delete key at the end", function (assert) {
    var leftNode = h("div", [
        h("div", { key: "a" }, "a"),
        h("div", { key: "b" }, "b"),
        h("div", { key: "c" }, "c")
    ])

    var rightNode = h("div", [
        h("div", { key: "a" }, "a"),
        h("div", { key: "b" }, "b")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)
    // just a remove patch
    assert.equal(patchCount(patches), 1)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 2)

    assert.equal(newRoot.childNodes[0], childNodes[0])
    assert.equal(newRoot.childNodes[1], childNodes[1])
    assert.end()
})

test("add key to end", function (assert) {
    var leftNode = h("div", [
        h("div", { key: "a" }, "a"),
        h("div", { key: "b" }, "b")
    ])

    var rightNode = h("div", [
        h("div", { key: "a" }, "a"),
        h("div", { key: "b" }, "b"),
        h("div", { key: "c" }, "c")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 1)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 3)

    assert.equal(newRoot.childNodes[0], childNodes[0])
    assert.equal(newRoot.childNodes[1], childNodes[1])
    assert.end()
})

test("add to end and delete from center & reverse", function (assert) {
    var leftNode = h("div", [
        h("div", { key: "a", id: "a" }, "a"),
        h("div", { key: "b", id: "b" }, "b"),
        h("div", { key: "c", id: "c" }, "c"),
        h("div", { key: "d", id: "d" }, "d")
    ])

    var rightNode = h("div", [
        h("div", { key: "e", id: "e" }, "e"),
        h("div", { key: "d", id: "d" }, "d"),
        h("div", { key: "c", id: "c" }, "c"),
        h("div", { key: "a", id: "a" }, "a")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 2)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 4)

    assert.equal(newRoot.childNodes[1], childNodes[3])
    assert.equal(newRoot.childNodes[2], childNodes[2])
    assert.equal(newRoot.childNodes[3], childNodes[0])
    assert.end()
})

test("add to front and remove", function (assert) {
    var leftNode = h("ul", [
        h("li", { key: "c" }, "c"),
        h("li", { key: "d" }, "d")
    ])

    var rightNode = h("ul", [
        h("li", { key: "a" }, "a"),
        h("li", { key: "b" }, "b"),
        h("li", { key: "c" }, "c"),
        h("li", { key: "e" }, "e")
    ])

    var rootNode = render(leftNode)
    var childNodes = childNodesArray(rootNode)

    var patches = diff(leftNode, rightNode)

    var newRoot = patch(rootNode, patches)
    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 4)

    assert.equal(newRoot.childNodes[2], childNodes[0])
    assert.end()
})

test("adding multiple widgets", function (assert) {
    function FooWidget(foo) {
        this.foo = foo
        this.counter = 0
        this.key = foo
    }

    FooWidget.prototype.init = function () {
        return render(h("div", String(this.foo)))
    }

    FooWidget.prototype.update = function (prev, elem) {
        this.counter = prev.counter + 1
        elem.textContent = this.foo + this.counter
    }

    FooWidget.prototype.type = "Widget"

    var firstTree = h("div", [])
    var rootNode = render(firstTree)

    assert.equal(rootNode.tagName, "DIV")

    var secondTree = h("div", [
        new FooWidget("foo")
    ])
    rootNode = patch(rootNode, diff(firstTree, secondTree))

    assert.equal(rootNode.tagName, "DIV")
    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].tagName, "DIV")
    assert.equal(rootNode.childNodes[0].childNodes[0].data, "foo")

    var thirdTree = h("div", [
        new FooWidget("foo"),
        new FooWidget("bar")
    ])
    rootNode = patch(rootNode, diff(secondTree, thirdTree))

    assert.equal(rootNode.tagName, "DIV")
    assert.equal(rootNode.childNodes.length, 2)

    assert.end()
})

var itemHelpers = {
    item: function (key) {
        key = key.toString()
        return h('div', { key: key, id: key }, ["" + key])
    },

    container: function (children) {
        return h('div', children)
    },

    itemsInContainer: function () {
        return {
            from: function (start) {
                return {
                    to: function (end) {
                        function withPredicate(predicate) {
                            var items = []
                            for (var i = start; i <= end; i++) {
                                if (!predicate(i)) continue
                                items.push(itemHelpers.item(i))
                            }
                            return itemHelpers.container(items)
                        }
                        return {
                            by: function (increment) {
                                return withPredicate(function (i) {
                                    return (i - start) % increment === 0
                                })
                            },
                            withPredicate: withPredicate
                        }
                    }
                }
            }
        }
    },

    expectTextOfChild: function (assert, rootNode, childNo, text) {
        assert.equal(rootNode.childNodes[childNo].id, text)
    }
}

test('3 elements in a container, insert an element after each', function (assert) {
    var threeItems = itemHelpers.itemsInContainer().from(0).to(4).by(2)
    var sixItems = itemHelpers.itemsInContainer().from(0).to(5).by(1)

    var rootNode = render(threeItems)
    rootNode = patch(rootNode, diff(threeItems, sixItems))

    for (var i = 0; i <= 5; i++) {
        itemHelpers.expectTextOfChild(assert, rootNode, i, i.toString())
    }

    assert.end()
})

test('10 elements in a container, remove every second element', function(assert) {
    var  fiveItems = itemHelpers.itemsInContainer().from(0).to(9).by(2)
    var tenItems = itemHelpers.itemsInContainer().from(0).to(9).by(1)

    var rootNode = render(tenItems)
    var patches = diff(tenItems, fiveItems)

    // 5 remove patches only
    assert.equal(patchCount(patches), 5)

    rootNode = patch(rootNode, patches)

    for (var i = 0; i < 5; i++) {
        itemHelpers.expectTextOfChild(assert, rootNode, i, (i * 2).toString())
    }

    assert.end()
})

test('3 elements in a container, add 3 elements after each', function (assert) {
    var first = itemHelpers.itemsInContainer().from(0).to(11).by(4)
    var second = itemHelpers.itemsInContainer().from(0).to(11).by(1)

    // Assert indices before
    assert.strictEqual(first.children.length, 3)

    var rootNode = render(first)

    for (var i = 0; i < 3; i++) {
        itemHelpers.expectTextOfChild(assert, rootNode, i, (4*i).toString())
    }

    // Assert indices after
    assert.strictEqual(second.children.length, 12)

    var newRoot = patch(rootNode, diff(first, second))

    for (var j = 0; j < 12; j++) {
        itemHelpers.expectTextOfChild(assert, newRoot, j, j.toString())
    }

    assert.end()
})

test('10 in container, add 1 after every 2nd element', function (assert) {
    function skipEveryThird(i) {
        return i % 3 === 0 || i % 3 === 1
    }

    var first = itemHelpers
        .itemsInContainer()
        .from(0)
        .to(14)
        .withPredicate(skipEveryThird)

    var second = itemHelpers.itemsInContainer().from(0).to(14).by(1)

    // Assert indices before
    assert.strictEqual(first.children.length, 10)

    var rootNode = render(first)
    var expectedIndices = [0, 1, 3, 4, 6, 7, 9, 10, 12, 13]

    for (var i = 0; i < 10; i++) {
        itemHelpers.expectTextOfChild(
            assert, rootNode, i, expectedIndices[i].toString()
        )
    }

    // Assert indices after
    assert.strictEqual(second.children.length, 15)

    var patches = diff(first, second)

    var newRoot = patch(rootNode, patches)

    for (var j = 0; j < 15; j++) {
        itemHelpers.expectTextOfChild(assert, newRoot, j, j.toString())
    }

    assert.end()
})

test('move a single element to the end', function (assert) {
    var start = nodesFromArray([0, 5, 1, 2, 3, 4])
    var end = nodesFromArray([0, 1, 2, 3, 4, 5])

    var patches = diff(start, end)

    assertReorderEquals(assert, patches, {
        removes: [{key: '5', from: 1}],
        inserts: [{key: '5', to: 5}]
    })
    assert.end()
})

test('move a single element to a later position', function (assert) {
    var start = nodesFromArray([0, 4, 1, 2, 3, 5])
    var end = nodesFromArray([0, 1, 2, 3, 4, 5])

    var patches = diff(start, end)

    assertReorderEquals(assert, patches, {
        removes: [{ key: '4', from: 1 }],
        inserts: [{ key: '4', to: 4 }]
    })
    assert.end()
})

test('remove a single element from early in the list', function (assert) {
    var start = nodesFromArray([0, 1, 2, 3, 4])
    var end = nodesFromArray([0, 2, 3, 4])

    var patches = diff(start, end)

    var reorderPatch = getReorderPatch(patches)
    assert.strictEqual(reorderPatch, null)
    assert.end()
})

test('move an element to a position after a removed element', function (assert) {
    var start = nodesFromArray([0, 1, 2, 3, 4, 5])
    var end = nodesFromArray([0, 2, 3, 5, 4])

    var patches = diff(start, end)

    assertReorderEquals(assert, patches, {
        removes: [
            {from: 1, key: null},
            {from: 4, key: '5'}
        ],
        inserts: [{to: 3, key: '5'}]
    })
    assert.end()
})

test('mixed keys move from i>0 to i<length-1', function (assert) {
    var start = nodesFromArray([undefined, undefined, 'key', undefined, undefined, undefined])
    var end = nodesFromArray([undefined, undefined, undefined, undefined, 'key', undefined])

    var patches = diff(start, end)

    assertReorderEquals(assert, patches, {
        removes: [{from: 2, key: 'key'}],
        inserts: [{to: 4, key: 'key'}]
    })
    assert.end()
})

/*
keyTest(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    [41, 3, 34, 36, 1, 40, 39, 7, 37, 14, 23, 26, 15, 6, 25, 24, 19, 8, 9, 22, 29, 27, 38, 35, 11, 20, 33, 31, 17, 32, 4, 28, 12, 2, 10, 0, 42, 21, 5, 16, 30, 18, 13]
)
*/

keyTest(
    [,8289652839303017,21512342290952802,6586509908083826,,7,8,9,2,5,6,1,,4,2379920135717839,26182894385419786,],
    [,1,2,3,4,5,6,7,8,9,]
)

/*automateTests({
    numTests: 1000,
    minLength: 5,
    maxLength: 12,
    minMutations: 15,
    maxMutations: 20,
    keyRatio: 0.8,
    mutations: [addKeyed, addNonKeyed, remove, swap, reverse, move]
})*/

function addKeyed(list) {
    list.push(('' + Math.random()).substring(2))

    return list
}

function addNonKeyed(list) {
    list.push(undefined)
    return list
}

function remove(list) {
    var index = Math.floor(Math.random() * list.length)

    list.splice(index, 1)

    return list
}

function swap(list) {
    var index1 = Math.floor(Math.random() * list.length)
    var index2 = Math.floor(Math.random() * list.length)

    var item1 = list[index1]
    list[index1] = list[index2]
    list[index2] = item1

    return list
}

function reverse(list) {
    return list.reverse()
}

function move(list) {
    var from = Math.floor(Math.random() * list.length)
    var to = Math.floor(Math.random() * list.length)

    list.splice(to, 0, list.splice(from, 1)[0])

    return list
}

function automateTests(options) {
    options = options || {}

    var numTests = options.numTests || 10
    var minLength = options.minLength || 5
    var maxLength = options.maxLength || 10
    var minMutations = options.minMutations || 3
    var maxMutations = options.maxMutations || 5
    var keyRatio = options.keyRatio || 1
    var mutations = options.mutations || []

    while (numTests--) {
        var length = Math.ceil(Math.random() * (maxLength - minLength)) + minLength
        var count = 0
        var end = []

        do {
            var isKeyed = Math.random() < keyRatio
            end[count] = isKeyed ? count : undefined
        }
        while (++count < length)

        var start = end.slice()

        if (mutations.length) {
            var numMutations = Math.ceil(Math.random() * (maxMutations - minMutations)) + minMutations
            while (numMutations--) {
                var mutation = mutations[Math.floor(Math.random() * mutations.length)]
                start = mutation(start)
            }
        }

        keyTest(start, end)
    }
}

function keyTest(itemsA, itemsB) {
    test(
        'keyTest([' + itemsA.join() + '], [' + itemsB.join() + '])',
        assertKeys
    )

    function assertKeys(assert) {
        var nodesA = nodesFromArray(itemsA)
        var nodesB = nodesFromArray(itemsB)

        var patches = diff(nodesA, nodesB)

        var rootNode = render(nodesA)
        patch(rootNode, patches)

        var childNodes = rootNode.childNodes

        assertChildNodesFromArray(assert, itemsB, childNodes)


        assert.end()
    }
}

function childNodesArray(node) {
    var childNodes = []
    for (var i = 0; i < node.childNodes.length; i++) {
        childNodes.push(node.childNodes[i])
    }
    return childNodes
}

function getReorderPatch(patches) {
    for (var key in patches) {
        if (key !== "a" && patches.hasOwnProperty(key)) {
            var patch = patches[key]
            if (patch.type === VPatch.ORDER) {
                return patch
            }
        }
    }

    return null
}

function assertReorderEquals(assert, patches, expected) {
    var reorderPatch = getReorderPatch(patches)

    assert.deepEqual(reorderPatch.patch, expected)
}


module.exports = assertChildNodesFromArray;

function assertChildNodesFromArray(assert, items, childNodes) {
    // ensure that the output has the same number of nodes as required
    assert.equal(childNodes.length, items.length)

    for (var i = 0; i < items.length; i++) {
        var key = items[i]
        assert.equal(childNodes[i].id, key != null ? String(key) : 'no-key-' + i)
    }
}


module.exports = assertEqualDom

function assertEqualDom(assert, a, b) {
    assert.ok(areEqual(a, b) && areEqual(b, a), "Dom structures are equal")
}

function areEqual(a, b) {
    for (var key in a) {
        if (key !== "parentNode" &&
            key !== "parentElement" &&
            key !== "defaultView" &&
            key !== "ownerElement" &&
            key !== "nextElementSibling" &&
            key !== "nextSibling" &&
            key !== "previousElementSibling" &&
            key !== "previousSibling" &&
            key !== "document" &&
            key !== "window" &&
            key !== "frames" &&
            key !== "top" &&
            key !== "parent" &&
            key !== "self" &&
            key !== "outerHTML" &&
            key !== "innerHTML" &&
            key !== "spellcheck" &&
            key !== "bind" &&
            "" + parseInt(key, 10) !== key
        ) {
            if (key === "ownerDocument") {
                return a[key] === b[key]
            }
            if (key === "style") {
                return equalStyle(a[key], b[key])
            }
            if (typeof a === "object" || typeof a === "function") {
                if (!areEqual(a[key], b[key])) {
                    return false
                }
            } else {
                if (a !== b) {
                    return false
                }
            }
        }
    }

    return true
}

// CssStyleDeclaration indexes the styles, which could be out of order
// This is a left sided check. Note that we call equal(a, b) and equal(b, a)
function equalStyle(a, b) {
    var keys = []
    for (var key in a) {
        if ("" + parseInt(key, 10) === key) {
            continue
        } else {
            keys.push(key)
        }
    }

    keys.sort()

    for (var i = 0; i < keys.length; i++) {
        if (a[key] !== b[key]) {
            return false
        }
    }

    return true
}


var h = require("../h.js")

module.exports = nodesFromArray

function nodesFromArray(array) {
    var i =0
    var children = []
    var key
    var properties

    for(; i < array.length; i++) {
        key = array[i]

        if (key != null) {
            properties = {
                key: key,
                id: String(key)
            }
        }
        else {
            properties = {
                id: 'no-key-' + i
            }
        }

        children.push(h('div', properties, properties.id))
    }

    return h('div', children)
}


module.exports = patchCount

function patchCount(patch) {
    var count = 0

    for (var key in patch) {
        if (key !== "a" && patch.hasOwnProperty(key)) {
            count++
        }
    }

    return count
}


var test = require("tape")

var h = require("../h.js")
var diff = require("../diff.js")
var patch = require("../patch.js")
var render = require("../create-element.js")
var Node = require("../vnode/vnode")
var TextNode = require("../vnode/vtext")
var version = require("../vnode/version")
var assertEqualDom = require("./lib/assert-equal-dom.js")
var patchCount = require("./lib/patch-count.js")



// VirtualNode tests
test("Node is a function", function (assert) {
    assert.equal(typeof Node, "function")
    assert.end()
})

test("Node type and version are set", function (assert) {
    assert.equal(Node.prototype.type, "VirtualNode")
    assert.deepEqual(Node.prototype.version, version)
    assert.end()
})

test("TextNode is a function", function (assert) {
    assert.equal(typeof TextNode, "function")
    assert.end()
})

test("TextNode type and version are set", function (assert) {
    assert.equal(TextNode.prototype.type, "VirtualText")
    assert.deepEqual(TextNode.prototype.version, version)
    assert.end()
})

// h tests

test("h is a function", function (assert) {
    assert.equal(typeof h, "function")
    assert.end()
})

test("defaults to div node", function (assert) {
    var node = h()
    assertNode(assert, node, "DIV")
    assert.end()
})

test("can use class selector", function (assert) {
    var node = h("div.pretty")
    assertNode(assert, node, "DIV", { className: "pretty" })
    assert.end()
})

test("can use non-ascii class selector", function (assert) {
    var node = h("div.ΑΒΓΔΕΖ")
    assertNode(assert, node, "DIV", { className: "ΑΒΓΔΕΖ" })
    assert.end()
})

test("class selectors combine with className property", function (assert) {
    var node = h("div.very", { className: "pretty" })
    assertNode(assert, node, "DIV", { className: "very pretty" })
    assert.end()
})

test("can use id selector", function (assert) {
    var node = h("div#important")
    assertNode(assert, node, "DIV", { id: "important" })
    assert.end()
})

test("can use non-ascii id selector", function (assert) {
    var node = h("div#ΑΒΓΔΕΖ")
    assertNode(assert, node, "DIV", { id: "ΑΒΓΔΕΖ" })
    assert.end()
})

test("properties id overrides selector id", function (assert) {
    var node = h("div#very", { id: "important" })
    assertNode(assert, node, "DIV", { id: "important" })
    assert.end()
})

test("defaults to div when using selectors", function (assert) {
    var node1 = h("#important")
    var node2 = h(".pretty")
    var node3 = h("#important.pretty")
    var node4 = h(".pretty#important")

    assertNode(assert, node1, "DIV", { id: "important" })
    assertNode(assert, node2, "DIV", { className: "pretty" })
    assertNode(assert, node3, "DIV", { id: "important", className: "pretty" })
    assertNode(assert, node4, "DIV", { id: "important", className: "pretty" })
    assert.end()
})

test("second argument can be children", function (assert) {
    var node1 = h("#important.pretty", "test")
    var node2 = h("#important.pretty", ["test"])
    var node3 = h("#important.pretty", h("p", "testing"))
    var node4 = h("#important.pretty", [h("p", "testing")])

    var props = { id: "important", className: "pretty" }

    assertNode(assert, node1, "DIV", props, ["test"])
    assertNode(assert, node2, "DIV", props, ["test"])
    assertNode(assert, node3, "DIV", props, [["P", {}, ["testing"]]])
    assertNode(assert, node4, "DIV", props, [["P", {}, ["testing"]]])
    assert.end()
})

test("third argument can be child or children", function (assert) {
    var node1 = h("#important.pretty", { a: "b" }, "test")
    var node2 = h("#important.pretty", { a: "b" }, ["test"])
    var node3 = h("#important.pretty", { a: "b" }, h("p", "testing"))
    var node4 = h("#important.pretty", { a: "b" }, [h("p", "testing")])

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
test("render is a function", function (assert) {
    assert.equal(typeof h, "function")
    assert.end()
})

test("render text node", function (assert) {
    var vdom = h("span", "hello")
    var dom = render(vdom)
    assert.equal(dom.tagName, "SPAN")
    assert.notOk(dom.id)
    assert.notOk(dom.className)
    assert.equal(dom.childNodes.length, 1)
    assert.equal(dom.childNodes[0].data, "hello")
    assert.end()
})

test("render div", function (assert) {
    var vdom = h()
    var dom = render(vdom)
    assert.notOk(dom.id)
    assert.notOk(dom.className)
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("node id is applied correctly", function (assert) {
    var vdom = h("#important")
    var dom = render(vdom)
    assert.equal(dom.id, "important")
    assert.notOk(dom.className)
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("node class name is applied correctly", function (assert) {
    var vdom = h(".pretty")
    var dom = render(vdom)
    assert.notOk(dom.id)
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("mixture of node/classname applied correctly", function (assert) {
    var vdom = h("#override.very", { id: "important", className: "pretty"})
    var dom = render(vdom)
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "very pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("style object is applied correctly", function (assert) {
    var vdom = h("#important.pretty", { style: {
        border: "1px solid rgb(0, 0, 0)",
        padding: "2px"
    } })
    var dom = render(vdom)
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.border, style("border", "1px solid rgb(0, 0, 0)"))
    assert.equal(dom.style.padding, style("padding", "2px"))
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("children are added", function (assert) {
    var vdom = h("div", [
        h("div", [
            "just testing",
            "multiple",
            h("b", "nodes")
        ]),
        "hello",
        h("span", "test")
    ])

    var dom = render(vdom)

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
    var vdom = h("#important.pretty", {
        style: {
            "cssText": "color: red;"
        }
    }, [
        null
    ])
    var dom = render(vdom)
    assert.equal(dom.id, "important")
    assert.equal(dom.className, "pretty")
    assert.equal(dom.tagName, "DIV")
    assert.equal(dom.style.cssText, style("cssText", "color: red;"))
    assert.equal(dom.childNodes.length, 0)
    assert.end()
})

test("injected document object is used", function (assert) {
    var vdom = h("div", "hello")
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
    render(vdom, { document: doc })
    assert.equal(count, 3)
    assert.end()
})

test("injected warning is used", function (assert) {
    var badObject = {}
    var vdom = h("#important.pretty", {
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

    var dom = render(vdom, { warn: warn })
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
    var hello = h("div", "hello")
    var goodbye = h("div", "goodbye")
    var rootNode = render(hello)
    var equalNode = render(goodbye)
    var patches = diff(hello, goodbye)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

test("textnode replace test", function (assert) {
    var hello = h("div", "hello")
    var goodbye = h("div", [h("span", "goodbye")])
    var rootNode = render(hello)
    var equalNode = render(goodbye)
    var patches = diff(hello, goodbye)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

test("textnode insert test", function (assert) {
    var hello = h("div", "hello")
    var again = h("span", ["hello", "again"])
    var rootNode = render(hello)
    var equalNode = render(again)
    var patches = diff(hello, again)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

test("textnode remove", function (assert) {
    var again = h("span", ["hello", "again"])
    var hello = h("div", "hello")
    var rootNode = render(again)
    var equalNode = render(hello)
    var patches = diff(again, hello)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

test("dom node update test", function (assert) {
    var hello = h("div.hello", "hello")
    var goodbye = h("div.goodbye", "goodbye")
    var rootNode = render(hello)
    var equalNode = render(goodbye)
    var patches = diff(hello, goodbye)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

test("dom node replace test", function (assert) {
    var hello = h("div", "hello")
    var goodbye = h("span", "goodbye")
    var rootNode = render(hello)
    var equalNode = render(goodbye)
    var patches = diff(hello, goodbye)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

test("dom node insert", function (assert) {
    var hello = h("div", [h("span", "hello")])
    var again = h("div", [h("span", "hello"), h("span", "again")])
    var rootNode = render(hello)
    var equalNode = render(again)
    var patches = diff(hello, again)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})

test("dom node remove", function (assert) {
    var hello = h("div", [h("span", "hello")])
    var again = h("div", [h("span", "hello"), h("span", "again")])
    var rootNode = render(again)
    var equalNode = render(hello)
    var patches = diff(again, hello)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)
    assert.end()
})


test("reuse dom node without breaking", function (assert) {
    var hSpan = h("span", "hello")
    var hello = h("div", [hSpan, hSpan, hSpan])
    var goodbye = h("div", [h("span", "hello"), hSpan, h("span", "goodbye")])
    var rootNode = render(hello)
    var equalNode = render(goodbye)
    var patches = diff(hello, goodbye)
    var newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, equalNode)

    // Undo the rendering with new trees
    hello = h("div", [hSpan, hSpan, hSpan])
    goodbye = h("div", [h("span", "hello"), hSpan, h("span", "goodbye")])
    patches = diff(goodbye, hello)
    newRoot = patch(rootNode, patches)
    assertEqualDom(assert, newRoot, rootNode)

    assert.end()
})

test("Allow empty textnode", function (assert) {
    var empty = h("span", "")
    var rootNode = render(empty)
    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].data, "")
    assert.end()
})

test("Can replace vnode with vtext", function (assert) {

    var leftNode = h("div", h("div"))
    var rightNode = h("div", "text")

    var rootNode = render(leftNode)

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].nodeType, 1)

    var patches = diff(leftNode, rightNode)

    var newRoot = patch(rootNode, patches)

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].nodeType, 3)

    assert.end()
})

// Widget tests
test("Widget is initialised on render", function (assert) {
    var initCount = 0
    var testNode = render(h("div"))
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

    var result = render(Widget)

    assert.equal(initCount, 1)
    assert.equal(result, testNode)
    assert.end()
})

test("Nested widget is initialised on render", function (assert) {
    var initCount = 0
    var testNode = render(h("div"))
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

    var vdom = h("div", [
        h("span", "text"),
        h("div.widgetContainer", [
            Widget
        ]),
        h("p", "more text")
    ])

    var result = render(vdom)

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
        return render(this.vdom)
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        assert.equal(this.state, rightState)
        assert.equal(leftNode.state, leftState)
        assert.equal(dom, domNode)
        patch(dom, diff(leftNode.vdom, this.vdom))
    }

    Widget.prototype.render = function (state) {
        return h("div", "" + state.a)
    }

    Widget.prototype.type = "Widget"

    var leftTree = new Widget(leftState)
    var rightTree = new Widget(rightState)
    domNode = render(leftTree)
    assert.equal(initCount, 1, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff(leftTree, rightTree)
    assert.equal(patchCount(patches), 1)
    assert.equal(initCount, 1, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch(domNode, patches)
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 1, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = render(rightTree)
    assert.equal(newRoot, domNode)
    assertEqualDom(assert, newRoot, expectedNode)
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
        return render(this.vdom)
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        assert.equal(this.state, rightState)
        assert.equal(leftNode.state, leftState)
        assert.equal(dom, domNode.childNodes[1].childNodes[0])
        patch(dom, diff(leftNode.vdom, this.vdom))
    }

    Widget.prototype.render = function (state) {
        return h("div", "" + state.a)
    }

    Widget.prototype.type = "Widget"

    var leftWidget = new Widget(leftState)
    var rightWidget = new Widget(rightState)

    var leftTree = h("div", [
        h("span", "text"),
        h("div.widgetContainer", [
            leftWidget
        ]),
        h("p", "more text")
    ])

    var rightTree = h("div", [
        h("span", "text"),
        h("div.widgetContainer", [
            rightWidget
        ]),
        h("p", "more text")
    ])

    domNode = render(leftTree)
    assert.equal(initCount, 1, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff(leftTree, rightTree)
    assert.equal(patchCount(patches), 1)
    assert.equal(initCount, 1, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch(domNode, patches)
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 1, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = render(rightTree)
    assert.equal(newRoot, domNode)
    assertEqualDom(assert, newRoot, expectedNode)
    assert.end()
})

test("Can replace stateful widget with vnode", function (assert) {
    var statefulWidget  = {
        init: function () {
            return render(h("div.widget"))
        },
        update: function () {},
        destroy: function () {},
        type: "Widget"
    }

    var leftNode = h("div", statefulWidget)
    var rightNode = h("div", h("div.vnode"))

    var rootNode = render(leftNode)

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].className, 'widget')

    var patches = diff(leftNode, rightNode)

    var newRoot = patch(rootNode, patches)

    assert.equal(newRoot, rootNode)

    assert.equal(newRoot.childNodes.length, 1)
    assert.equal(newRoot.childNodes[0].className, 'vnode')

    assert.end()
})

test("Can replace vnode with stateful widget with vnode", function (assert) {
    var statefulWidget  = {
        init: function () {
            return render(h("div.widget"))
        },
        update: function () {},
        destroy: function () {},
        type: "Widget"
    }

    var leftNode = h("div", h("div.vnode"))
    var rightNode = h("div", statefulWidget)

    var rootNode = render(leftNode)

    assert.equal(rootNode.childNodes.length, 1)
    assert.equal(rootNode.childNodes[0].className, 'vnode')

    var patches = diff(leftNode, rightNode)

    var newRoot = patch(rootNode, patches)

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
        return render(this.vdom)
    }

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++
        patch(dom, diff(leftNode.vdom, this.vdom))
    }

    Widget.prototype.render = function (state) {
        return h("div", "" + state.a)
    }

    Widget.prototype.type = "Widget"

    var rightWidget = new Widget(rightState)

    var leftTree = h("div.container", [
        h("div")
    ])

    var rightTree = h("div.container", [
        h("section.widgetContainer", rightWidget)
    ])

    domNode = render(leftTree)
    assert.equal(initCount, 0, "initCount after left render")
    assert.equal(updateCount, 0, "updateCount after left render")

    var patches = diff(leftTree, rightTree)
    assert.equal(patchCount(patches), 1)
    assert.equal(initCount, 0, "initCount after diff")
    assert.equal(updateCount, 0, "updateCount after diff")

    var newRoot = patch(domNode, patches)
    assert.equal(initCount, 1, "initCount after patch")
    assert.equal(updateCount, 0, "updateCount after patch")

    // The patch should only update sibling value in this use case
    var expectedNode = render(rightTree)
    assert.equal(newRoot, domNode)
    assertEqualDom(assert, newRoot, expectedNode)
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

    var stateful = h("div", [statefulWidget])
    var pure = h("div", [pureWidget])

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

    var rootNode = render(h("div"))
    patch(rootNode, diff(statefulWidget, h("div")))
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

    var rootNode = render(h("div"))
    var patches = diff(statefulWidget, newWidget)
    patch(rootNode, patches)
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

    var rootNode = render(h("div"))
    patch(rootNode, diff(statefulWidget, newWidget))
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

    var rootNode = render(h("div"))
    patch(rootNode, diff(statefulWidget, null))
    assert.equal(count, 1)
    assert.end()
})

test("Patching parent destroys stateful sibling", function (assert) {
    var count = 0
    var widgetRoot = render(h("span"))
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

    var deepTree = h("div", [
        "hello",
        h("span", "test"),
        h("div", [
            h("article", [statefulWidget])
        ]),
        h("div", [
            h("div", "test")
        ])
    ])

    var rootNode

    rootNode = render(deepTree)
    patch(rootNode, diff(deepTree, null))
    assert.equal(count, 1)

    rootNode = render(deepTree)
    patch(rootNode, diff(deepTree, h("span")))
    assert.equal(count, 2)

    rootNode = render(deepTree)
    patch(rootNode, diff(deepTree, h("div")))
    assert.equal(count, 3)

    assert.end()
})

test("Widget update can replace domNode", function (assert) {
    var widgetInit = render(h("span.init"))
    var widgetUpdate = render(h("span.update"))

    function Widget () {}
    Widget.prototype.init = function () {
        return widgetInit
    }
    Widget.prototype.update = function () {
        return widgetUpdate
    }
    Widget.prototype.destroy = function () {}
    Widget.prototype.type = "Widget"

    var initTree = h("div.init", [new Widget])
    var updateTree = h("div.update", [new Widget])
    var rootNode

    rootNode = render(initTree)
    assert.equal(rootNode.childNodes[0], widgetInit)

    patch(rootNode, diff(initTree, updateTree))

    assert.equal(rootNode.childNodes[0], widgetUpdate)
    assert.end()
})

test("Destroy widget nested in removed thunk", function (assert) {
    var count = 0
    var widgetRoot = render(h(".widget"))
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
    var vnode = h(".wrapper", statefulWidget)

    function Thunk() {}

    Thunk.prototype.render = function () {
        return vnode
    }

    Thunk.prototype.type = "Thunk"

    var thunkTree = h(".page", [
        h(".section", [
            new Thunk()
        ])
    ])

    var empty = h(".empty")

    var rootNode = render(thunkTree)
    patch(rootNode, diff(thunkTree, empty))
    assert.equal(count, 1)

    assert.end()
})

test("Create element respects namespace", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var svgURI = "http://www.w3.org/2000/svg"
    var vnode = new Node("svg", {}, [], null, svgURI)
    var node = render(vnode)

    assert.equal(node.tagName, "svg")
    assert.equal(node.namespaceURI, svgURI)
    assert.end()
})

test("Different namespaces creates a patch", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var leftNode = new Node("div", {}, [], null, "testing")
    var rightNode = new Node("div", {}, [], null, "undefined")

    var rootNode = render(leftNode)
    assert.equal(rootNode.tagName, "div")
    assert.equal(rootNode.namespaceURI, "testing")

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 1)

    rootNode = patch(rootNode, patches)

    assert.equal(rootNode.tagName, "div")
    assert.equal(rootNode.namespaceURI, "undefined")

    assert.end()
})

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = render(h())
    node.style[name] = value
    return node.style[name]
}

// Determine if namespace is supported by the DOM
function supportsNamespace() {
    var node = render(h())
    return 'namespaceURI' in node;
}



var test = require("tape")

var h = require("../h.js")
var diff = require("../diff.js")
var patch = require("../patch.js")
var render = require("../create-element.js")
var assertEqualDom = require("./lib/assert-equal-dom.js")

test("dom node style", function (assert) {
    var a = h("div", {
        style: {
            border: "none",
            className: "oops",
            display: "none"
        }
    })

    var b = h("div", {
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
    var newRoot = patch(rootNode, diff(a, b))
    var s2 = newRoot.style
    assertEqualDom(assert, newRoot, equalNode)
    assert.equal(newRoot.style.border, style("border", "1px solid #000"))
    assert.equal(newRoot.style.className, style("className", "oops"))
    assert.equal(newRoot.style.display, style("display", ""))
    assert.equal(s1, s2)
    assert.end()
})

test("dom node dataset", function (assert) {
    var a = h("div", { dataset: { foo: "bar", bar: "oops" } })
    var b = h("div", { dataset: { foo: "baz", bar: "oops" } })
    var rootNode = render(a)
    var d1 = rootNode.dataset
    assert.equal(rootNode.dataset.foo, "bar")
    assert.equal(rootNode.dataset.bar, "oops")
    var equalNode = render(b)
    var newRoot = patch(rootNode, diff(a, b))
    var d2 = newRoot.dataset
    assertEqualDom(assert, newRoot, equalNode)
    assert.equal(newRoot.dataset.foo, "baz")
    assert.equal(newRoot.dataset.bar, "oops")
    assert.equal(d1, d2)
    assert.end()
})

test("dom node attributes", function (assert) {
    var a = h("div", { attributes: { foo: "bar", bar: "oops" } })
    var b = h("div", { attributes: { foo: "baz", bar: "oops" } })
    var rootNode = render(a)
    var equalNode = render(b)

    var newRoot = patch(rootNode, diff(a, b))

    assertEqualDom(assert, newRoot, equalNode)
    assert.equal(newRoot.getAttribute("foo"), "baz")
    assert.equal(newRoot.getAttribute("bar"), "oops")
    assert.end()
})

test("patch nested properties in right only", function (assert) {
    var prev = h("div")
    var curr = h("div", { style: { display: "none" } })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.style.display, style("display", "none"))

    assert.end()
})

test("null properties", function (assert) {
    var prev = h("div", { propA: "bar", propC: {} })
    var curr = h("div", { propB: "apples" })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA, "")
    assert.equal(elem.propC, null)
    assert.equal(elem.propB, "apples")

    assert.end()
})

test("replace object with value", function (assert) {
    var prev = h("div", { propA: { foo: "bar" } })
    var curr = h("div", { propA: null })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA, null)
    assert.end()
})

test("create object on node for nested properties", function (assert) {
    var prev = h("div", { propA: null })
    var curr = h("div", { propA: { nested: true } })

    var elem = createAndPatch(prev, curr)

    assert.equal(elem.propA.nested, true)
    assert.end()
})

function createAndPatch(prev, curr) {
    var elem = render(prev)
    var patches = diff(prev, curr)
    return patch(elem, patches)
}

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = render(h())
    node.style[name] = value
    return node.style[name]
}


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


//
// This tests the performance of vtree/diff.
//
// This test in it's current configuration will test every array permutation of
// N numbers from 0, 2, ... N  for N = 1 up to and including N = 9.
//
// Furthermore, arrays for N 10, 20, 30, ... 1000 are tested. Since the number
// of permutations is a factorial problem, we can't test all permutations for
// these. We generate 100 arrays instead and randomly shuffle them for testing.
//
// Each test is timed in a benchmark version of the test which removes the
// peripheral operations, and each test is also re-run against a validation
// version, which checks to ensure that the arrays are actually sorted.
//
// Essentially this test proves that the sorting algorithm for N 0-based
// consecutive integers works for ALL permutations up to length 9.
//

var PERMUTATION_START = 1;
var PERMUTATION_END = 9;

var SAMPLE_START = 10;
var SAMPLE_END = 1000;
var SAMPLE_COUNT = 100;
var SAMPLE_INTERVAL = 10;

var nodesFromArray = require('./lib/nodes-from-array.js');
var assertChildNodesFromArray = require('./lib/assert-childNodes-from-array.js');

var diff = require('../vtree/diff');
var render = require('../create-element.js');
var patch = require('../patch.js');

var assert = require('assert');

var document = require('global/document');

var testlingOutput = document.getElementById('__testling_output');
if (testlingOutput) {
    testlingOutput.parentNode.removeChild(testlingOutput);
}

runTest();
// validateOnly();
// benchmarkOnly();

function runTest() {
    forEachPermutation(PERMUTATION_START, PERMUTATION_END, testArrays);
    forEachSample(SAMPLE_START, SAMPLE_END, SAMPLE_COUNT, SAMPLE_INTERVAL, testArrays);
}

function testArrays(arrays) {
    runSort(arrays);
    runBench(arrays);
}

function validateOnly() {
    forEachPermutation(PERMUTATION_START, PERMUTATION_END, runSort);
    forEachSample(SAMPLE_START, SAMPLE_END, SAMPLE_COUNT, SAMPLE_INTERVAL, runSort);
}

function benchmarkOnly() {
    forEachPermutation(PERMUTATION_START, PERMUTATION_END, runBench);
    forEachSample(SAMPLE_START, SAMPLE_END, SAMPLE_COUNT, SAMPLE_INTERVAL, runBench);
}

function runBench(permutations) {
    var count = permutations.length;
    var arrayLength = permutations[0].goal.length;

    console.log('Benchmarking sort for length ', arrayLength);

    var startTime = Date.now();

    for (var i = 0; i < count; i++) {
        var item = permutations[i];
        var goal = nodesFromArray(item.goal);
        var shuffled = nodesFromArray(item.shuffled);

        var rootNode = render(shuffled);
        document.body.appendChild(rootNode);
        var reflow = rootNode.offsetWidth;
        var patches = diff(shuffled, goal);
        patch(rootNode, patches);
        reflow = rootNode.offsetWidth;
        document.body.removeChild(rootNode);
    }

    var totalTime = Date.now() - startTime;
    var average = totalTime / count >> 0

    console.log('All (' + count + ') arrays sorted in', totalTime, 'ms');
    console.log('An array of length', arrayLength, 'sorts in', average, 'ms');
}

function runSort(permutations) {
    var count = permutations.length;

    console.log('Testing sort for length ', permutations[0].goal.length);

    for (var i = 0; i < count; i++) {
        var item = permutations[i];
        var goal = nodesFromArray(item.goal);
        var shuffled = nodesFromArray(item.shuffled);

        var rootNode = render(shuffled);
        var patches = diff(shuffled, goal);
        patch(rootNode, patches);

        assertChildNodesFromArray(assert, item.goal, rootNode.childNodes);
    }

    console.log('All permutations sorted correctly');
}

function forEachPermutation(start, end, run) {
    for (var arrayLength = start; arrayLength <= end; arrayLength++) {
        var array = createArray(arrayLength);

        console.log('Generating test permutations for length', arrayLength);
        var permutations = permutator(array);

        run(permutations);
    }
}

function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
        memo = memo || [];

        var cur;

        for (var i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                results.push({
                    goal: inputArr,
                    shuffled: memo.concat(cur)
                });
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }

        return results;
    }

    return permute(inputArr);
}

function forEachSample(start, end, count, interval, run) {
    console.log(arguments);
    for (var i = start; i <= end; i += interval) {
        var samples = new Array(count);

        console.log("Generating", count, "sample arrays of length", i);

        for (var j = 0; j < count; j++) {
            var goal = createArray(i);
            samples[j] = {
                goal: goal,
                shuffled: shuffle(goal)
            };
        }

        run(samples);
    }
}

function createArray(arrayLength) {
    var array = new Array(arrayLength);

    for (var numberToAdd = 0; numberToAdd < arrayLength; numberToAdd++) {
        array[numberToAdd] = numberToAdd;
    }

    return array;
}

function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


var test = require("tape")
var document = require("global/document")

var h = require("../h")
var diff = require("../diff")
var patch = require("../patch")
var render = require("../create-element")

var patchCount = require("./lib/patch-count")


test("style patches correctly", function (assert) {
    var leftNode = h("div", {
        style: {
            border: "1px solid #000"
        }
    })

    var rightNode = h("div", {
        style: {
            padding: "5px"
        }
    })

    var patches = diff(leftNode, rightNode)
    assert.equal(patchCount(patches), 1);

    var rootNode = render(leftNode)
    assert.equal(rootNode.style.border, style("border", "1px solid #000"))

    var newRoot = patch(rootNode, patches)
    assert.equal(rootNode, newRoot)

    assert.equal(newRoot.style.padding, style("padding", "5px"))
    assert.equal(newRoot.style.border, style("border", ""))

    assert.end()
})

function style(name, setValue) {
    var div = document.createElement("div")
    div.style[name] = setValue
    return div.style[name]
}



var test = require("tape")

var isThunk = require("../vnode/is-thunk")
var isVNode = require("../vnode/is-vnode")
var VNode = require("../vnode/vnode")
var diff = require("../diff.js")

var patchCount = require("./lib/patch-count.js")

function Thunk(tagName) {
    this.tagName = tagName
}

Thunk.prototype.render = function () {
    return new VNode(this.tagName)
}

Thunk.prototype.type = "Thunk"

test("is thunk", function (assert) {
    var notThunk = {}
    var thunkLiteral = {
        type: "Thunk",
        render: function () {}
    }

    assert.notOk(isThunk(notThunk))
    assert.ok(isThunk(thunkLiteral))
    assert.ok(isThunk(new Thunk("div")))
    assert.end()
})

test("null or undefined previous renders thunk", function (assert) {
    var n = new Thunk("first")
    var u = new Thunk("second")
    var nullPatches = diff(null, n)
    var undefPatches = diff(undefined, u)

    assert.ok(isVNode(n.vnode))
    assert.ok(isVNode(u.vnode))
    assert.equal(n.vnode.tagName, "first")
    assert.equal(u.vnode.tagName, "second")
    assert.equal(patchCount(nullPatches), 1)
    assert.equal(patchCount(undefPatches), 1)
    assert.end()
})

test("previous thunk passed to render", function (assert) {
    var renderCount = 0

    var previousThunk = new Thunk("div")

    var nextThunk = {
        type: "Thunk",
        render: function (previous) {
            renderCount++
            assert.equal(previous, previousThunk)
            return new VNode("test")
        }
    }

    var patches = diff(previousThunk, nextThunk)

    assert.equal(renderCount, 1)
    assert.equal(patchCount(patches), 1)
    assert.ok(isVNode(nextThunk.vnode))
    assert.equal(nextThunk.vnode.tagName, "test")
    assert.end()
})


var test = require("tape")
var isObject = require("is-object")

var h = require("../h.js")
var diff = require("../diff.js")
var patch = require("../patch.js")
var render = require("../create-element.js")

test("undefined props are not set in create-element", function (assert) {
    var node = h("div", { special: undefined })
    var rootNode = render(node)
    assert.ok(!("special" in rootNode))
    assert.end()
})

test("undefined removes all previous styles", function (assert) {
    var leftNode = h("div", {
        style: {
            display: "none",
            border: "1px solid #000"
        }
    })

    var rightNode = h("div", {
        style: undefined
    })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.style.display, style("display", ""))
    assert.equal(rootNode.style.border, style("border", ""))
    assert.end();
})

test("undefined style removes individual styles", function (assert) {
    var leftNode = h("div", { "style": { "display": "none" }})
    var rightNode = h("div", { "style": undefined })

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

    var leftNode = h("input", { value: new CheckNodeBeforeSet("hello") })
    var rightNode = h("input", { value: undefined })

    var rootNode = render(leftNode)
    assert.equal(rootNode.value, "hello")

    var newRoot = patch(rootNode, diff(leftNode, rightNode))
    assert.equal(newRoot.value, "hello")

    assert.end()
})

test("undefined nulls other complex types", function (assert) {
    var leftNode = h("input", { special: {} })
    var rightNode = h("input", { special: null })

    var rootNode = render(leftNode)
    assert.ok(isObject(rootNode.special))


    var newRoot = patch(rootNode, diff(leftNode, rightNode))
    assert.equal(newRoot.special, null)

    assert.end()
})

test("null not ignored for value", function (assert) {
    var leftNode = h("input", { value: "hello" })
    var rightNode = h("input", { value: null })

    var rootNode = createAndPatch(leftNode, rightNode)

    assert.equal(rootNode.value, property("input", "value", null))
    assert.end()
})

test("null not ignored for objects", function (assert) {
    var leftNode = h("div", { "test": { "complex": "object" }})
    var rightNode = h("div", { "test": null })

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

    var leftNode = h("input", { value: new CheckNodeBeforeSet("hello") })
    var rightNode = h("input", { value: null })

    var rootNode = render(leftNode)
    assert.equal(rootNode.value, "hello")

    var newRoot = patch(rootNode, diff(leftNode, rightNode))
    assert.equal(newRoot.value, property("input", "value", null))

    assert.end()
})

function createAndPatch(prev, curr) {
    var elem = render(prev)
    var patches = diff(prev, curr)
    return patch(elem, patches)
}

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = render(h())
    node.style[name] = value
    return node.style[name]
}

// Safely transaltes node property using the DOM in the browser
function property(tag, prop, value) {
    var node = render(h(tag))
    node[prop] = value
    return node[prop]
}


var test = require("tape")

var handleThunk = require("../vnode/handle-thunk")
var VNode = require("../vnode/vnode")
var VText = require("../vnode/vtext")

test("render a new thunk to vnode", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var renderedBNode = new VNode("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handleThunk(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

test("render a new thunk to vtext", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var renderedBNode = new VText("text")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handleThunk(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

test("render a new thunk to a widget", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var renderedBNode = { type: "Widget" }

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handleThunk(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

test("render current thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return { type: "Thunk" }
        },
        type: "Thunk"
    }

    var result

    try {
        handleThunk(aNode, bNode)
    } catch (e) {
        result = e
    }

    assert.equal(result.message, "thunk did not return a valid node")
    assert.end()
})

test("render previous thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.equal(previous, null)
            return { type: "Thunk" }
        },
        type: "Thunk"
    }

    var renderedBNode = new VNode("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result

    try {
        handleThunk(aNode, bNode)
    } catch (e) {
        result = e
    }

    assert.equal(result.message, "thunk did not return a valid node")
    assert.end()
})

test("normal nodes are returned", function (assert) {
    var aNode = new VNode('div')
    var bNode = new VNode('div')

    var result = handleThunk(aNode, bNode)

    assert.equal(result.a, aNode)
    assert.equal(result.b, bNode)
    assert.end()
})



require("../vnode/test/handle-thunk.js")


var test = require("tape")
var diffProps = require("../vtree/diff-props")

test("add attributes to empty attributes", function (assert) {
    var propsA = {
      attributes : {}
    }
    var propsB = {
        attributes : {
            class : "standard",
            "e-text" : "custom"
        }
    }

    var diff = diffProps(propsA,propsB)
    assert.equal(diff.attributes.class, "standard")
    assert.equal(diff.attributes["e-text"], "custom")

    assert.end()
})


require("../vtree/test/diff-props")


