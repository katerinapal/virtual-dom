import ext_test from "tape";
import { isThunk as isthunk_isThunk } from "../vnode/is-thunk";
import { isVirtualNode as isVNode } from "../vnode/is-vnode";
import { VirtualNode as VNode } from "../vnode/vnode";
import { diff as diff_diff } from "../diff.js";
import { patchCount as patchcount_patchCount } from "./lib/patch-count.js";

function Thunk(tagName) {
    this.tagName = tagName
}

Thunk.prototype.render = function () {
    return new VNode(this.tagName);
}

Thunk.prototype.type = "Thunk"

ext_test("is thunk", function (assert) {
    var notThunk = {}
    var thunkLiteral = {
        type: "Thunk",
        render: function () {}
    }

    assert.notOk(isthunk_isThunk(notThunk))
    assert.ok(isthunk_isThunk(thunkLiteral))
    assert.ok(isthunk_isThunk(new Thunk("div")))
    assert.end()
})

ext_test("null or undefined previous renders thunk", function (assert) {
    var n = new Thunk("first")
    var u = new Thunk("second")
    var nullPatches = diff_diff(null, n)
    var undefPatches = diff_diff(undefined, u)

    assert.ok(isVNode(n.vnode))
    assert.ok(isVNode(u.vnode))
    assert.equal(n.vnode.tagName, "first")
    assert.equal(u.vnode.tagName, "second")
    assert.equal(patchcount_patchCount(nullPatches), 1)
    assert.equal(patchcount_patchCount(undefPatches), 1)
    assert.end()
})

ext_test("previous thunk passed to render", function (assert) {
    var renderCount = 0

    var previousThunk = new Thunk("div")

    var nextThunk = {
        type: "Thunk",
        render: function (previous) {
            renderCount++
            assert.equal(previous, previousThunk)
            return new VNode("test");
        }
    }

    var patches = diff_diff(previousThunk, nextThunk)

    assert.equal(renderCount, 1)
    assert.equal(patchcount_patchCount(patches), 1)
    assert.ok(isVNode(nextThunk.vnode))
    assert.equal(nextThunk.vnode.tagName, "test")
    assert.end()
})
