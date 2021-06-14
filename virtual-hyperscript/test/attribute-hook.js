import ext_test from "tape";
import ext_doc from "global/document";
import { AttributeHook as attributeHook } from "../hooks/attribute-hook.js";
import { h as index_h } from "../index.js";
import { createElement as createelement_createElement } from "../../vdom/create-element";
import { patch as patch_patch } from "../../vdom/patch";
import { diff as diff_diff } from "../../vtree/diff";
var patches;

ext_test("sets and removes namespaced attribute", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = attributeHook(namespace, 'first value')
    var hook2 = attributeHook(namespace, 'first value')
    var hook3 = attributeHook(namespace, 'second value')

    var first = index_h('div', {'myns:myattr': hook1})
    var second = index_h('div', {'myns:myattr': hook2})
    var third = index_h('div', {'myns:myattr': hook3})
    var fourth = index_h('div', {})

    var elem = createelement_createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value')

    var patches = diff_diff(first, second)
    patch_patch(elem, patches)
    // The value shouldn't change.
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value')

    patches = diff_diff(second, third)
    patch_patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'second value')

    patches = diff_diff(third, fourth)
    patch_patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    assert.end()
})

ext_test("sets the attribute if previous value was not an AttributeHook", function (assert) {
    var namespace = 'http://ns.com/my'

    var OtherHook = function(namespace, value) {
        this.namespace = namespace
        this.value = value
    }
    OtherHook.prototype.hook = function() {}

    var hook1 = new OtherHook(namespace, 'the value')
    var hook2 = attributeHook(namespace, 'the value')

    var first = index_h('div', {'myns:myattr': hook1})
    var second = index_h('div', {'myns:myattr': hook2})

    var elem = createelement_createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    patches = diff_diff(first, second)
    patch_patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    assert.end()
})

ext_test("sets the attribute if previous value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = attributeHook('http://other.ns/', 'the value')
    var hook2 = attributeHook(namespace, 'the value')

    var first = index_h('div', {'myns:myattr': hook1})
    var second = index_h('div', {'myns:myattr': hook2})

    var elem = createelement_createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    patches = diff_diff(first, second)
    patch_patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    assert.end()
})

ext_test("removes the attribute if next value is not an AttributeHook", function (assert) {
    var namespace = 'http://ns.com/my'

    var OtherHook = function(namespace, value) {
        this.namespace = namespace
        this.value = value
    }
    OtherHook.prototype.hook = function() {}

    var hook1 = attributeHook(namespace, 'the value')
    var hook2 = new OtherHook(namespace, 'the value')

    var first = index_h('div', {'myns:myattr': hook1})
    var second = index_h('div', {'myns:myattr': hook2})

    var elem = createelement_createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    patches = diff_diff(first, second)
    patch_patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    assert.end()
})

ext_test("removes the attribute if next value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my'

    var hook1 = attributeHook(namespace, 'the value')
    var hook2 = attributeHook('http://other.ns/', 'the value')

    var first = index_h('div', {'myns:myattr': hook1})
    var second = index_h('div', {'myns:myattr': hook2})

    var elem = createelement_createElement(first)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value')

    patches = diff_diff(first, second)
    patch_patch(elem, patches)
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS())

    assert.end()
})

function blankAttributeNS() {
    // Most browsers conform to the latest version of the DOM spec,
    // which requires `getAttributeNS` to return `null` when the attribute
    // doesn't exist, but some browsers (including phantomjs) implement the
    // old version of the spec and return an empty string instead, see:
    // https://developer.mozilla.org/en-US/docs/Web/API/element.getAttributeNS#Return_value
    var div = ext_doc.createElement("div")
    return div.getAttributeNS(null, "foo")
}
export { patches };
