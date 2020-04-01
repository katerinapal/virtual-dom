import test from "tape";
import doc from "global/document";
import { AttributeHook as hooksattributehook_AttributeHookjs } from "../hooks/attribute-hook.js";
import { h as index_hjs } from "../index.js";
import { createElement as vdomcreateelement_createElementjs } from "../../vdom/create-element";
import { patch as vdompatch_patchjs } from "../../vdom/patch";
import { diff as vtreediff_diffjs } from "../../vtree/diff";

test("sets and removes namespaced attribute", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = hooksattributehook_AttributeHookjs(namespace, 'first value')
    var hook2 = hooksattributehook_AttributeHookjs(namespace, 'first value')
    var hook3 = hooksattributehook_AttributeHookjs(namespace, 'second value')

    var first = index_hjs('div', {'myns:myattr': hook1})
    var second = index_hjs('div', {'myns:myattr': hook2})
    var third = index_hjs('div', {'myns:myattr': hook3})
    var fourth = index_hjs('div', {})

    var elem = vdomcreateelement_createElementjs(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value')

    var patches = vtreediff_diffjs(first, second)
    vdompatch_patchjs(elem, patches)
    // The value shouldn't change.
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value')

    patches = vtreediff_diffjs(second, third)
    vdompatch_patchjs(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'second value')

    patches = vtreediff_diffjs(third, fourth)
    vdompatch_patchjs(elem, patches)
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
    var hook2 = hooksattributehook_AttributeHookjs(namespace, 'the value')

    var first = index_hjs('div', {'myns:myattr': hook1})
    var second = index_hjs('div', {'myns:myattr': hook2})

    var elem = vdomcreateelement_createElementjs(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    patches = vtreediff_diffjs(first, second)
    vdompatch_patchjs(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    assert.end()
})

test("sets the attribute if previous value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = hooksattributehook_AttributeHookjs('http://other.ns/', 'the value')
    var hook2 = hooksattributehook_AttributeHookjs(namespace, 'the value')

    var first = index_hjs('div', {'myns:myattr': hook1})
    var second = index_hjs('div', {'myns:myattr': hook2})

    var elem = vdomcreateelement_createElementjs(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    patches = vtreediff_diffjs(first, second)
    vdompatch_patchjs(elem, patches)
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

    var hook1 = hooksattributehook_AttributeHookjs(namespace, 'the value')
    var hook2 = new OtherHook(namespace, 'the value')

    var first = index_hjs('div', {'myns:myattr': hook1})
    var second = index_hjs('div', {'myns:myattr': hook2})

    var elem = vdomcreateelement_createElementjs(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    patches = vtreediff_diffjs(first, second)
    vdompatch_patchjs(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    assert.end()
})

test("removes the attribute if next value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = hooksattributehook_AttributeHookjs(namespace, 'the value')
    var hook2 = hooksattributehook_AttributeHookjs('http://other.ns/', 'the value')

    var first = index_hjs('div', {'myns:myattr': hook1})
    var second = index_hjs('div', {'myns:myattr': hook2})

    var elem = vdomcreateelement_createElementjs(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    patches = vtreediff_diffjs(first, second)
    vdompatch_patchjs(elem, patches)
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
