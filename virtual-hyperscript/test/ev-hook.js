import ext_tape_test from "tape";
import ext_evstore_EvStore from "ev-store";
import { h as index_hjs } from "../index.js";
import { createElement as vdomcreateelement_createElementjs } from "../../vdom/create-element";
import { diff as vtreediff_diffjs } from "../../vtree/diff";

ext_tape_test("h with events", function (assert) {
    function one() {}

    var left = index_hjs(".foo", {
        "ev-click": one
    })

    var right = index_hjs(".bar", {})

    var elem = vdomcreateelement_createElementjs(left)

    var ds1 = ext_evstore_EvStore(elem)
    assert.ok(ds1)
    assert.equal(ds1.click, one)

    var patches = vtreediff_diffjs(left, right)

    vdompatch_patchjs(elem, patches)

    var ds2 = ext_evstore_EvStore(elem)
    assert.ok(ds2)
    assert.equal(ds1, ds2)
    assert.equal(ds2.click, undefined)

    assert.end()
})
