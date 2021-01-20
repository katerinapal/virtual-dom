import ext_test from "tape";
import ext_EvStore from "ev-store";
import { h as index_h } from "../index.js";
import { createElement as createelement_createElement } from "../../vdom/create-element";
import { patch as patch_patch } from "../../vdom/patch";
import { diff as diff_diff } from "../../vtree/diff";

ext_test("h with events", function (assert) {
    function one() {}

    var left = index_h(".foo", {
        "ev-click": one
    })

    var right = index_h(".bar", {})

    var elem = createelement_createElement(left)

    var ds1 = ext_EvStore(elem)
    assert.ok(ds1)
    assert.equal(ds1.click, one)

    var patches = diff_diff(left, right)

    patch_patch(elem, patches)

    var ds2 = ext_EvStore(elem)
    assert.ok(ds2)
    assert.equal(ds1, ds2)
    assert.equal(ds2.click, undefined)

    assert.end()
})
