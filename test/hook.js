"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _h = require("../h.js");

var _vnode = require("../vnode/vnode.js");

var _createElement = require("../create-element.js");

var _diff = require("../diff.js");

var _patch = require("../patch.js");

var _patchCount = require("./lib/patch-count.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("Stateful hooks are added to a hooks object on a node", function (assert) {
    function StatefulHook() {}
    StatefulHook.prototype.hook = function () {};
    StatefulHook.prototype.unhook = function () {};
    var statefulValue = new StatefulHook();

    function StatelessHook() {}
    StatelessHook.prototype.hook = function () {};
    var statelessValue = new StatelessHook();

    var node = new _vnode.VirtualNode("div", {
        stateful: statefulValue,
        stateless: statelessValue,
        value: "not a hook"
    }, [], null, null);

    assert.equal(node.hooks.stateful, statefulValue);
    assert.equal(node.hooks.stateless, undefined);
    assert.equal(node.descendantHooks, false);
    assert.end();
});

(0, _tape2.default)("Node child stateless hooks are not identified", function (assert) {
    function Prop() {}
    Prop.prototype.hook = function () {};
    var propValue = new Prop();

    var node = new _vnode.VirtualNode("div", {
        "id": propValue,
        "value": "not a hook"
    }, [], undefined, undefined);

    var parentNode = new _vnode.VirtualNode("div", {
        "id": "not a hook"
    }, [node], undefined, undefined);

    assert.equal(node.hooks, undefined);
    assert.equal(parentNode.hooks, undefined);
    assert.notOk(parentNode.descendantHooks);
    assert.end();
});

(0, _tape2.default)("Node child stateful hooks are identified", function (assert) {
    function Prop() {}
    Prop.prototype.hook = function () {};
    Prop.prototype.unhook = function () {};
    var propValue = new Prop();

    var node = new _vnode.VirtualNode("div", {
        "id": propValue,
        "value": "not a hook"
    }, [], undefined, undefined);

    var parentNode = new _vnode.VirtualNode("div", {
        "id": "not a hook"
    }, [node], undefined, undefined);

    assert.equal(node.hooks.id, propValue);
    assert.equal(parentNode.hooks, undefined);
    assert.ok(parentNode.descendantHooks);
    assert.end();
});

(0, _tape2.default)("hooks get called in render", function (assert) {
    var counter = 0;
    var vtree = (0, _h.h)("div", {
        "some-key": hook(function (elem, prop) {
            counter++;
            assert.equal(prop, "some-key");
            assert.equal(elem.tagName, "DIV");

            elem.className = "bar";
        })
    });

    var elem = (0, _createElement.createElement)(vtree);
    assert.equal(elem.className, "bar");
    assert.equal(counter, 1);

    assert.end();
});

(0, _tape2.default)("functions are not hooks in render", function (assert) {
    var counter = 0;
    var fakeHook = function fakeHook() {
        counter++;
    };
    var vtree = (0, _h.h)("div", {
        "someProp": fakeHook
    });

    var elem = (0, _createElement.createElement)(vtree);
    assert.equal(elem.someProp, fakeHook);
    assert.equal(counter, 0);

    assert.end();
});

(0, _tape2.default)("hooks get called in patch", function (assert) {
    var counter = 0;
    var prev = (0, _h.h)("div");
    var curr = (0, _h.h)("div", {
        "some-key": hook(function (elem, prop) {
            counter++;
            assert.equal(prop, "some-key");
            assert.equal(elem.tagName, "DIV");

            elem.className = "bar";
        })
    });

    var elem = createAndPatch(prev, curr);
    assert.equal(elem.className, "bar");
    assert.equal(counter, 1);

    assert.end();
});

(0, _tape2.default)("hooks are called with DOM node, property name, and previous/next value", function (assert) {
    function Hook(name) {
        this.name = name;
        this.hookArgs = [];
        this.unhookArgs = [];
    }
    Hook.prototype.hook = function () {
        this.hookArgs.push([].slice.call(arguments, 0));
    };
    Hook.prototype.unhook = function () {
        this.unhookArgs.push([].slice.call(arguments, 0));
    };

    var hook1 = new Hook('hook1');
    var hook2 = new Hook('hook2');

    var first = (0, _h.h)("div", { id: 'first', hook: hook1 });
    var second = (0, _h.h)("div", { id: 'second', hook: hook2 });
    var third = (0, _h.h)("div");

    var elem = (0, _createElement.createElement)(first);
    assert.equal(hook1.hookArgs.length, 1);
    assert.deepEqual(hook1.hookArgs[0], [elem, 'hook', undefined]);
    assert.equal(hook1.unhookArgs.length, 0);

    var patches = (0, _diff.diff)(first, second);
    elem = (0, _patch.patch)(elem, patches);
    assert.equal(hook2.hookArgs.length, 1);
    assert.deepEqual(hook2.hookArgs[0], [elem, 'hook', hook1]);
    assert.equal(hook1.unhookArgs.length, 1);
    assert.deepEqual(hook1.unhookArgs[0], [elem, 'hook', hook2]);

    patches = (0, _diff.diff)(second, third);
    elem = (0, _patch.patch)(elem, patches);
    assert.equal(hook2.hookArgs.length, 1);
    assert.equal(hook2.unhookArgs.length, 1);
    assert.deepEqual(hook2.unhookArgs[0], [elem, 'hook', undefined]);

    assert.end();
});

(0, _tape2.default)("functions are not hooks in render", function (assert) {
    var counter = 0;
    var fakeHook = function fakeHook() {
        counter++;
    };

    var prev = (0, _h.h)("div");
    var curr = (0, _h.h)("div", { someProp: fakeHook });

    var elem = createAndPatch(prev, curr);
    assert.equal(elem.someProp, fakeHook);
    assert.equal(counter, 0);

    assert.end();
});

(0, _tape2.default)("two different hooks", function (assert) {
    var counters = { a: 0, b: 0 };
    var prev = (0, _h.h)("div", { propA: hook(function () {
            counters.a++;
        }) });
    var curr = (0, _h.h)("div", { propB: hook(function () {
            counters.b++;
        }) });

    var elem = createAndPatch(prev, curr);
    assert.equal(elem.propA, undefined);
    assert.equal(elem.propB, null);
    assert.equal(counters.a, 1);
    assert.equal(counters.b, 1);

    assert.end();
});

(0, _tape2.default)("two hooks on same property", function (assert) {
    var counters = { a: 0, b: 0 };
    var prev = (0, _h.h)("div", { propA: hook(function () {
            counters.a++;
        }) });
    var curr = (0, _h.h)("div", { propA: hook(function () {
            counters.b++;
        }) });

    var elem = createAndPatch(prev, curr);
    assert.equal(elem.propA, undefined);
    assert.equal(counters.a, 1);
    assert.equal(counters.b, 1);

    assert.end();
});

(0, _tape2.default)("two hooks of same interface", function (assert) {
    function Hook(key) {
        this.key = key;
    }
    Hook.prototype.hook = function () {
        counters[this.key]++;
    };

    var counters = { a: 0, b: 0 };
    var prev = (0, _h.h)("div", { propA: new Hook("a") });
    var curr = (0, _h.h)("div", { propA: new Hook("b") });

    var elem = createAndPatch(prev, curr);
    assert.equal(elem.propA, undefined);
    assert.equal(counters.a, 1, "counters.a");
    assert.equal(counters.b, 1, "counters.b");

    assert.end();
});

(0, _tape2.default)("hooks are not called on trivial diff", function (assert) {
    var counters = {
        a: 0,
        b: 0,
        c: 0
    };

    var vnode = (0, _h.h)("div", {
        test: hook(function () {
            counters.a++;
        })
    }, [(0, _h.h)("div", { test: hook(function () {
            counters.b++;
        }) }), (0, _h.h)("div", { test: hook(function () {
            counters.c++;
        }) })]);

    var rootNode = (0, _createElement.createElement)(vnode);
    assert.equal(counters.a, 1, "counters.a");
    assert.equal(counters.b, 1, "counters.b");
    assert.equal(counters.c, 1, "counters.c");

    var patches = (0, _diff.diff)(vnode, vnode);
    assert.equal((0, _patchCount.patchCount)(patches), 0);

    var newRoot = (0, _patch.patch)(rootNode, patches);
    assert.equal(newRoot, rootNode);
    assert.equal(counters.a, 1, "counters.a patch");
    assert.equal(counters.b, 1, "counters.b patch");
    assert.equal(counters.c, 1, "counters.c patch");
    assert.end();
});

(0, _tape2.default)("property-replacing diff calls unhook", function (assert) {
    unhookCallCount = 0;

    function zhook(x) {
        this.x = x;
    }
    zhook.prototype.hook = function () {
        return null;
    };

    zhook.prototype.unhook = function () {
        unhookCallCount += 1;
    };

    hooker = new zhook('ONE');
    hooker2 = new zhook('TWO');

    var firstTree = (0, _h.h)("div", { roothook: hooker });
    var secondTree = (0, _h.h)("div", { roothook: hooker2 });
    var thirdTree = (0, _h.h)("span");

    var rootNode = (0, _createElement.createElement)(firstTree);

    var firstPatches = (0, _diff.diff)(firstTree, secondTree);
    rootNode = (0, _patch.patch)(rootNode, firstPatches);

    var secondPatches = (0, _diff.diff)(secondTree, thirdTree);
    rootNode = (0, _patch.patch)(rootNode, secondPatches);

    assert.strictEqual(unhookCallCount, 2, "Missing unhook calls");

    assert.end();
});

(0, _tape2.default)("unhook-only hook is a valid hook", function (assert) {
    var unhookCalled = false;

    function UnhookHook() {}

    UnhookHook.prototype.unhook = function () {
        unhookCalled = true;
    };

    var hook = new UnhookHook();

    var firstTree = (0, _h.h)('div', { hook: hook });
    var secondTree = (0, _h.h)('div', {});

    var rootNode = (0, _createElement.createElement)(firstTree);

    assert.notOk(unhookCalled);

    var patches = (0, _diff.diff)(firstTree, secondTree);
    rootNode = (0, _patch.patch)(rootNode, patches);

    assert.ok(unhookCalled);
    assert.end();
});

(0, _tape2.default)("all hooks are unhooked", function (assert) {
    var hookCounts = {};
    var unhookCounts = {};

    function Hook(value) {
        if (!(this instanceof Hook)) {
            return new Hook(value);
        }
        this.value = value;
    }

    Hook.prototype.hook = function hook() {
        var key = this.value;
        if (key in hookCounts) {
            hookCounts[key]++;
        } else {
            hookCounts[key] = 1;
        }
    };

    Hook.prototype.unhook = function unhook() {
        var key = this.value;
        if (key in unhookCounts) {
            unhookCounts[key]++;
        } else {
            unhookCounts[key] = 1;
        }
    };

    var rootHook = Hook("rootHook");
    var childHookA = Hook("childHookA");
    var childHookB = Hook("childHookB");
    var childHookC = Hook("childHookC");
    var thunkyRootHook = Hook("thunkyRootHook");
    var thunkyChildHookA = Hook("thunkyChildHookA");
    var thunkyChildHookB = Hook("thunkyChildHookB");
    var thunkyChildHookC = Hook("thunkyChildHookC");

    function Thunky() {}

    Thunky.prototype.render = function () {
        return (0, _h.h)("div", {
            rootHook: thunkyRootHook
        }, [(0, _h.h)("div", {
            childHook: thunkyChildHookA
        }), (0, _h.h)("div", {
            childHook: thunkyChildHookB
        }), (0, _h.h)("div", {
            childHook: thunkyChildHookC
        })]);
    };

    Thunky.prototype.type = "Thunk";

    var firstTree = (0, _h.h)("div", {
        rootHook: rootHook
    }, [(0, _h.h)("div", {
        childHook: childHookA
    }), (0, _h.h)("div", {
        childHook: childHookB
    }, [new Thunky()]), (0, _h.h)("div", {
        childHook: childHookC
    })]);

    var secondTree = (0, _h.h)("div", {
        rootHook: rootHook
    }, [(0, _h.h)("div", {
        childHook: childHookA
    }), (0, _h.h)("div", {
        childHook: childHookB
    }, [new Thunky()]), (0, _h.h)("div", {
        childHook: childHookC
    })]);

    var thirdTree = (0, _h.h)('span');

    var rootNode = (0, _createElement.createElement)(firstTree);

    assertHooked();

    var firstPatches = (0, _diff.diff)(firstTree, secondTree);

    assertHooked();

    assert.strictEqual((0, _patchCount.patchCount)(firstPatches), 0, "No patches for identical");
    rootNode = (0, _patch.patch)(rootNode, firstPatches);

    assertHooked();

    var secondPatches = (0, _diff.diff)(secondTree, thirdTree);

    assertHooked();

    // Expect 1 root patch, 3 unhook patches and a thunk patch
    assert.strictEqual((0, _patchCount.patchCount)(secondPatches), 5, "Expect unhook patches");

    rootNode = (0, _patch.patch)(rootNode, secondPatches);

    assertUnhooked();

    assert.end();

    function assertHooked() {
        assert.strictEqual(hookCounts.rootHook, 1);
        assert.strictEqual(hookCounts.childHookA, 1);
        assert.strictEqual(hookCounts.childHookB, 1);
        assert.strictEqual(hookCounts.childHookC, 1);
        assert.strictEqual(hookCounts.thunkyRootHook, 1);
        assert.strictEqual(hookCounts.thunkyChildHookA, 1);
        assert.strictEqual(hookCounts.thunkyChildHookB, 1);
        assert.strictEqual(hookCounts.thunkyChildHookC, 1);
        assert.strictEqual(unhookCounts.rootHook, undefined);
        assert.strictEqual(unhookCounts.childHookA, undefined);
        assert.strictEqual(unhookCounts.childHookB, undefined);
        assert.strictEqual(unhookCounts.childHookC, undefined);
        assert.strictEqual(unhookCounts.thunkyRootHook, undefined);
        assert.strictEqual(unhookCounts.thunkyChildHookA, undefined);
        assert.strictEqual(unhookCounts.thunkyChildHookB, undefined);
        assert.strictEqual(unhookCounts.thunkyChildHookC, undefined);
    }

    function assertUnhooked() {
        assert.strictEqual(hookCounts.rootHook, 1);
        assert.strictEqual(hookCounts.childHookA, 1);
        assert.strictEqual(hookCounts.childHookB, 1);
        assert.strictEqual(hookCounts.childHookC, 1);
        assert.strictEqual(hookCounts.thunkyRootHook, 1);
        assert.strictEqual(hookCounts.thunkyChildHookA, 1);
        assert.strictEqual(hookCounts.thunkyChildHookB, 1);
        assert.strictEqual(hookCounts.thunkyChildHookC, 1);
        assert.strictEqual(unhookCounts.rootHook, 1);
        assert.strictEqual(unhookCounts.childHookA, 1);
        assert.strictEqual(unhookCounts.childHookB, 1);
        assert.strictEqual(unhookCounts.childHookC, 1);
        assert.strictEqual(unhookCounts.thunkyRootHook, 1);
        assert.strictEqual(unhookCounts.thunkyChildHookA, 1);
        assert.strictEqual(unhookCounts.thunkyChildHookB, 1);
        assert.strictEqual(unhookCounts.thunkyChildHookC, 1);
    }
});

function createAndPatch(prev, curr) {
    var elem = (0, _createElement.createElement)(prev);
    var patches = (0, _diff.diff)(prev, curr);
    elem = (0, _patch.patch)(elem, patches);

    return elem;
}

function Type(fn) {
    this.fn = fn;
}

Type.prototype.hook = function () {
    this.fn.apply(this, arguments);
};

function hook(fn) {
    return new Type(fn);
}
