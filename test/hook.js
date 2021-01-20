import ext_test from "tape";
import { h as h_h } from "../h.js";
import { VirtualNode as Node } from "../vnode/vnode.js";
import { createElement as create } from "../create-element.js";
import { diff as diff_diff } from "../diff.js";
import { patch as patch_patch } from "../patch.js";
import { patchCount as patchcount_patchCount } from "./lib/patch-count.js";
var hooker2;
var hooker;
var unhookCallCount;

ext_test("Stateful hooks are added to a hooks object on a node", function (assert) {
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

ext_test("Node child stateless hooks are not identified", function (assert) {
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

ext_test("Node child stateful hooks are identified", function (assert) {
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

ext_test("hooks get called in render", function (assert) {
    var counter = 0
    var vtree = h_h("div", {
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

ext_test("functions are not hooks in render", function (assert) {
    var counter = 0
    var fakeHook = function () {
        counter++
    }
    var vtree = h_h("div", {
        "someProp": fakeHook
    })

    var elem = create(vtree)
    assert.equal(elem.someProp, fakeHook)
    assert.equal(counter, 0)

    assert.end()
})

ext_test("hooks get called in patch", function (assert) {
    var counter = 0
    var prev = h_h("div")
    var curr = h_h("div", {
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

ext_test("hooks are called with DOM node, property name, and previous/next value", function (assert) {
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

    var first = h_h("div", { id: 'first', hook: hook1 })
    var second = h_h("div", { id: 'second', hook: hook2 })
    var third = h_h("div")

    var elem = create(first)
    assert.equal(hook1.hookArgs.length, 1)
    assert.deepEqual(hook1.hookArgs[0], [elem, 'hook', undefined])
    assert.equal(hook1.unhookArgs.length, 0)

    var patches = diff_diff(first, second)
    elem = patch_patch(elem, patches)
    assert.equal(hook2.hookArgs.length, 1)
    assert.deepEqual(hook2.hookArgs[0], [elem, 'hook', hook1])
    assert.equal(hook1.unhookArgs.length, 1)
    assert.deepEqual(hook1.unhookArgs[0], [elem, 'hook', hook2])

    patches = diff_diff(second, third)
    elem = patch_patch(elem, patches)
    assert.equal(hook2.hookArgs.length, 1)
    assert.equal(hook2.unhookArgs.length, 1)
    assert.deepEqual(hook2.unhookArgs[0], [elem, 'hook', undefined])

    assert.end()
})

ext_test("functions are not hooks in render", function (assert) {
    var counter = 0
    var fakeHook = function () {
        counter++
    }

    var prev = h_h("div")
    var curr = h_h("div", { someProp: fakeHook })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.someProp, fakeHook)
    assert.equal(counter, 0)

    assert.end()
})

ext_test("two different hooks", function (assert) {
    var counters = { a: 0, b: 0 }
    var prev = h_h("div", { propA: hook(function () {
        counters.a++
    }) })
    var curr = h_h("div", { propB: hook(function () {
        counters.b++
    }) })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.propA, undefined)
    assert.equal(elem.propB, null)
    assert.equal(counters.a, 1)
    assert.equal(counters.b, 1)

    assert.end()
})

ext_test("two hooks on same property", function (assert) {
    var counters = { a: 0, b: 0 }
    var prev = h_h("div", { propA: hook(function () {
        counters.a++
    }) })
    var curr = h_h("div", { propA: hook(function () {
        counters.b++
    }) })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.propA, undefined)
    assert.equal(counters.a, 1)
    assert.equal(counters.b, 1)

    assert.end()
})

ext_test("two hooks of same interface", function (assert) {
    function Hook(key) {
        this.key = key
    }
    Hook.prototype.hook = function () {
        counters[this.key]++
    }

    var counters = { a: 0, b: 0 }
    var prev = h_h("div", { propA: new Hook("a") })
    var curr = h_h("div", { propA: new Hook("b") })

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.propA, undefined)
    assert.equal(counters.a, 1, "counters.a")
    assert.equal(counters.b, 1, "counters.b")

    assert.end()
})

ext_test("hooks are not called on trivial diff", function (assert) {
    var counters = {
        a: 0,
        b: 0,
        c: 0
    }

    var vnode = h_h("div", {
        test: hook(function () {
            counters.a++
        })
    }, [
        h_h("div", { test: hook(function () { counters.b++ }) }),
        h_h("div", { test: hook(function () { counters.c++ }) })
    ])

    var rootNode = create(vnode)
    assert.equal(counters.a, 1, "counters.a")
    assert.equal(counters.b, 1, "counters.b")
    assert.equal(counters.c, 1, "counters.c")

    var patches = diff_diff(vnode, vnode)
    assert.equal(patchcount_patchCount(patches), 0)

    var newRoot = patch_patch(rootNode, patches)
    assert.equal(newRoot, rootNode)
    assert.equal(counters.a, 1, "counters.a patch")
    assert.equal(counters.b, 1, "counters.b patch")
    assert.equal(counters.c, 1, "counters.c patch")
    assert.end()
})

ext_test("property-replacing diff calls unhook", function (assert) {
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

  var firstTree = h_h("div", {roothook: hooker})
  var secondTree = h_h("div", {roothook: hooker2})
  var thirdTree = h_h("span")

  var rootNode = create(firstTree)

  var firstPatches = diff_diff(firstTree, secondTree)
  rootNode = patch_patch(rootNode, firstPatches)


  var secondPatches = diff_diff(secondTree, thirdTree)
  rootNode = patch_patch(rootNode, secondPatches)

  assert.strictEqual(unhookCallCount, 2, "Missing unhook calls")

  assert.end()
})

ext_test("unhook-only hook is a valid hook", function (assert) {
    var unhookCalled = false;

    function UnhookHook() {}

    UnhookHook.prototype.unhook = function() {
        unhookCalled = true
    }

    var hook = new UnhookHook()

    var firstTree = h_h('div', {hook: hook})
    var secondTree = h_h('div', {})

    var rootNode = create(firstTree)

    assert.notOk(unhookCalled)

    var patches = diff_diff(firstTree, secondTree)
    rootNode = patch_patch(rootNode, patches)

    assert.ok(unhookCalled)
    assert.end()
})

ext_test("all hooks are unhooked", function (assert) {
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
        return h_h("div", {
            rootHook: thunkyRootHook
        }, [
            h_h("div", {
                childHook: thunkyChildHookA
            }),
            h_h("div", {
                childHook: thunkyChildHookB
            }),
            h_h("div", {
                childHook: thunkyChildHookC
            })
        ]);
    }

    Thunky.prototype.type = "Thunk"


    var firstTree = h_h("div", {
        rootHook: rootHook
    }, [
        h_h("div", {
            childHook: childHookA
        }),
        h_h("div", {
            childHook: childHookB
        }, [
            new Thunky()
        ]),
        h_h("div", {
            childHook: childHookC
        })
    ])

    var secondTree = h_h("div", {
        rootHook: rootHook
    }, [
        h_h("div", {
            childHook: childHookA
        }),
        h_h("div", {
            childHook: childHookB
        }, [
            new Thunky()
        ]),
        h_h("div", {
            childHook: childHookC
        })
    ])

    var thirdTree = h_h('span')

    var rootNode = create(firstTree)

    assertHooked();

    var firstPatches = diff_diff(firstTree, secondTree)

    assertHooked();

    assert.strictEqual(patchcount_patchCount(firstPatches), 0, "No patches for identical")
    rootNode = patch_patch(rootNode, firstPatches)

    assertHooked();

    var secondPatches = diff_diff(secondTree, thirdTree)

    assertHooked();

    // Expect 1 root patch, 3 unhook patches and a thunk patch
    assert.strictEqual(patchcount_patchCount(secondPatches), 5, "Expect unhook patches")

    rootNode = patch_patch(rootNode, secondPatches)

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
    var patches = diff_diff(prev, curr)
    elem = patch_patch(elem, patches)

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
