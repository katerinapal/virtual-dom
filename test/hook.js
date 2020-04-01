import test from "tape";
import { h as h_hjs } from "../h.js";
import { VirtualNode as vnodevnode_VirtualNodejs } from "../vnode/vnode.js";
import { createElement as createelement_createElementjs } from "../create-element.js";
import { diff as diff_diffjs } from "../diff.js";
import { patch as patch_patchjs } from "../patch.js";
import { patchCount as libpatchcount_patchCountjs } from "./lib/patch-count.js";

test("Stateful hooks are added to a hooks object on a node", function (assert) {
    function StatefulHook() {}
    StatefulHook.prototype.hook = function () {}
    StatefulHook.prototype.unhook = function () {}
    var statefulValue = new StatefulHook()

    function StatelessHook() {}
    StatelessHook.prototype.hook = function () {}
    var statelessValue = new StatelessHook()

    var node = new vnodevnode_VirtualNodejs("div", {
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

    var node = new vnodevnode_VirtualNodejs("div", {
        "id": propValue,
        "value": "not a hook"
    }, [], undefined, undefined)

    var parentNode = new vnodevnode_VirtualNodejs("div", {
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

    var node = new vnodevnode_VirtualNodejs("div", {
        "id": propValue,
        "value": "not a hook"
    }, [], undefined, undefined)

    var parentNode = new vnodevnode_VirtualNodejs("div", {
        "id": "not a hook"
    }, [node], undefined, undefined)

    assert.equal(node.hooks.id, propValue)
    assert.equal(parentNode.hooks, undefined)
    assert.ok(parentNode.descendantHooks)
    assert.end()
})

test("hooks get called in render", function (assert) {
    var counter = 0
    var vtree = h_hjs

    var elem = createelement_createElementjs
    assert.equal(elem.className, "bar")
    assert.equal(counter, 1)

    assert.end()
})

test("functions are not hooks in render", function (assert) {
    var counter = 0
    var fakeHook = function () {
        counter++
    }
    var vtree = h_hjs

    var elem = createelement_createElementjs
    assert.equal(elem.someProp, fakeHook)
    assert.equal(counter, 0)

    assert.end()
})

test("hooks get called in patch", function (assert) {
    var counter = 0
    var prev = h_hjs
    var curr = h_hjs

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

    var first = h_hjs
    var second = h_hjs
    var third = h_hjs

    var elem = createelement_createElementjs
    assert.equal(hook1.hookArgs.length, 1)
    assert.deepEqual(hook1.hookArgs[0], [elem, 'hook', undefined])
    assert.equal(hook1.unhookArgs.length, 0)

    var patches = diff_diffjs
    elem = patch_patchjs
    assert.equal(hook2.hookArgs.length, 1)
    assert.deepEqual(hook2.hookArgs[0], [elem, 'hook', hook1])
    assert.equal(hook1.unhookArgs.length, 1)
    assert.deepEqual(hook1.unhookArgs[0], [elem, 'hook', hook2])

    patches = diff_diffjs
    elem = patch_patchjs
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

    var prev = h_hjs
    var curr = h_hjs

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.someProp, fakeHook)
    assert.equal(counter, 0)

    assert.end()
})

test("two different hooks", function (assert) {
    var counters = { a: 0, b: 0 }
    var prev = h_hjs
    var curr = h_hjs

    var elem = createAndPatch(prev, curr)
    assert.equal(elem.propA, undefined)
    assert.equal(elem.propB, null)
    assert.equal(counters.a, 1)
    assert.equal(counters.b, 1)

    assert.end()
})

test("two hooks on same property", function (assert) {
    var counters = { a: 0, b: 0 }
    var prev = h_hjs
    var curr = h_hjs

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
    var prev = h_hjs
    var curr = h_hjs

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

    var vnode = h_hjs

    var rootNode = createelement_createElementjs
    assert.equal(counters.a, 1, "counters.a")
    assert.equal(counters.b, 1, "counters.b")
    assert.equal(counters.c, 1, "counters.c")

    var patches = diff_diffjs
    assert.equal(libpatchcount_patchCountjs(patches), 0)

    var newRoot = patch_patchjs
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

  var firstTree = h_hjs
  var secondTree = h_hjs
  var thirdTree = h_hjs

  var rootNode = createelement_createElementjs

  var firstPatches = diff_diffjs
  rootNode = patch_patchjs


  var secondPatches = diff_diffjs
  rootNode = patch_patchjs

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

    var firstTree = h_hjs
    var secondTree = h_hjs

    var rootNode = createelement_createElementjs

    assert.notOk(unhookCalled)

    var patches = diff_diffjs
    rootNode = patch_patchjs

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
        return h_hjs;
    }

    Thunky.prototype.type = "Thunk"


    var firstTree = h_hjs

    var secondTree = h_hjs

    var thirdTree = h_hjs

    var rootNode = createelement_createElementjs

    assertHooked();

    var firstPatches = diff_diffjs

    assertHooked();

    assert.strictEqual(libpatchcount_patchCountjs(firstPatches), 0, "No patches for identical")
    rootNode = patch_patchjs

    assertHooked();

    var secondPatches = diff_diffjs

    assertHooked();

    // Expect 1 root patch, 3 unhook patches and a thunk patch
    assert.strictEqual(libpatchcount_patchCountjs(secondPatches), 5, "Expect unhook patches")

    rootNode = patch_patchjs

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
    var elem = createelement_createElementjs
    var patches = diff_diffjs
    elem = patch_patchjs

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
