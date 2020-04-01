import test from "tape";
import { isThunk as vnodeisthunk_isThunkjs } from "../vnode/is-thunk";
import { isVirtualNode as vnodeisvnode_isVirtualNodejs } from "../vnode/is-vnode";
import { VirtualNode as vnodevnode_VirtualNodejs } from "../vnode/vnode";
import { diff as diff_diffjs } from "../diff.js";
import { patchCount as libpatchcount_patchCountjs } from "./lib/patch-count.js";

function Thunk(tagName) {
    this.tagName = tagName
}

Thunk.prototype.render = function () {
    return new vnodevnode_VirtualNodejs(this.tagName);
}

Thunk.prototype.type = "Thunk"

test("is thunk", function (assert) {
    var notThunk = {}
    var thunkLiteral = {
        type: "Thunk",
        render: function () {}
    }

    assert.notOk(vnodeisthunk_isThunkjs(notThunk))
    assert.ok(vnodeisthunk_isThunkjs(thunkLiteral))
    assert.ok(vnodeisthunk_isThunkjs(new Thunk("div")))
    assert.end()
})

test("null or undefined previous renders thunk", function (assert) {
    var n = new Thunk("first")
    var u = new Thunk("second")
    var nullPatches = diff_diffjs(null, n)
    var undefPatches = diff_diffjs(undefined, u)

    assert.ok(vnodeisvnode_isVirtualNodejs(n.vnode))
    assert.ok(vnodeisvnode_isVirtualNodejs(u.vnode))
    assert.equal(n.vnode.tagName, "first")
    assert.equal(u.vnode.tagName, "second")
    assert.equal(libpatchcount_patchCountjs(nullPatches), 1)
    assert.equal(libpatchcount_patchCountjs(undefPatches), 1)
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
            return new vnodevnode_VirtualNodejs("test");
        }
    }

    var patches = diff_diffjs(previousThunk, nextThunk)

    assert.equal(renderCount, 1)
    assert.equal(libpatchcount_patchCountjs(patches), 1)
    assert.ok(vnodeisvnode_isVirtualNodejs(nextThunk.vnode))
    assert.equal(nextThunk.vnode.tagName, "test")
    assert.end()
})
