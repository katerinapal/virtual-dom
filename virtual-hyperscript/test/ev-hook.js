import test from "tape";
import EvStore from "ev-store";
import { h as index_hjs } from "../index.js";
import { createElement as vdomcreateelement_createElementjs } from "../../vdom/create-element";
import { patch as vdompatch_patchjs } from "../../vdom/patch";
import { diff as vtreediff_diffjs } from "../../vtree/diff";

test("h with events", function (assert) {
    function one() {}

    var left = index_hjs(".foo", {
        "ev-click": one
    })

    var right = index_hjs(".bar", {})

    var elem = vdomcreateelement_createElementjs(left)

    var ds1 = EvStore(elem)
    assert.ok(ds1)
    assert.equal(ds1.click, one)

    var patches = vtreediff_diffjs(left, right)

    vdompatch_patchjs(elem, patches)

    var ds2 = EvStore(elem)
    assert.ok(ds2)
    assert.equal(ds1, ds2)
    assert.equal(ds2.click, undefined)

    assert.end()
})
