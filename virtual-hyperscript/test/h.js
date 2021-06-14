import ext_test from "tape";
import ext_EvStore from "ev-store";
import { h as index_h } from "../index";

ext_test("h is a function", function (assert) {
    assert.equal(typeof index_h, "function")
    assert.end()
})

ext_test("h returns a vnode", function (assert) {
    assert.equal(index_h("div").tagName, "DIV")

    assert.end()
})

ext_test("h defaults tagName to uppercase", function (assert) {
    assert.equal(index_h("").tagName, "DIV")
    assert.equal(index_h("div").tagName, "DIV")
    assert.end()
})

ext_test("h preserves tagName case if namespace is given", function (assert) {
    assert.equal(index_h("test", { namespace: "http://www.w3.org/XML/1998/namespace" }).tagName, "test")
    assert.end()
})

ext_test("h has props", function (assert) {
    assert.equal(index_h("div", {
        foo: "bar"
    }).properties.foo, "bar")

    assert.end()
})

ext_test("h with text", function (assert) {
    var node = index_h("div", "text")

    assert.equal(node.children[0].text, "text")

    assert.end()
})

ext_test("h with key", function (assert) {
    var node = index_h("div", { key: "bar" })

    assert.equal(node.key, "bar")

    assert.end()
})


ext_test("h with ev-", function (assert) {
    var node = index_h("div", { "ev-foo": "bar" })

    assert.ok(node.properties["ev-foo"])

    var hook = node.properties["ev-foo"]
    var elem = {}
    hook.hook(elem, "ev-foo")
    assert.equal(ext_EvStore(elem).foo, "bar")

    assert.end()
})

ext_test("input.value soft hook", function (assert) {
    var node = index_h("input", { value: "text" })

    assert.equal(typeof node.properties.value, "object")
    var elem = {}
    node.properties.value.hook(elem, "value")

    assert.equal(elem.value, "text")

    assert.end()
})

ext_test("h with child", function (assert) {
    var node = index_h("div", index_h("span"))

    assert.equal(node.children[0].tagName, "SPAN")

    assert.end()
})

ext_test("h with children", function (assert) {
    var node = index_h("div", [index_h("span")])

    assert.equal(node.children[0].tagName, "SPAN")

    assert.end()
})

ext_test("h with null", function (assert) {
    var node = index_h("div", null)
    var node2 = index_h("div", [null])

    assert.equal(node.children.length, 0)
    assert.equal(node2.children.length, 0)

    assert.end()
})

ext_test("h with undefined", function (assert) {
    var node = index_h("div", undefined)
    var node2 = index_h("div", [undefined])

    assert.equal(node.children.length, 0)
    assert.equal(node2.children.length, 0)

    assert.end()
})

ext_test("h with foreign object", function (assert) {
    var errorSingleChild

    try {
        index_h("div", null, { foreign: "object" })
    } catch (e) {
        errorSingleChild = e
    }

    var errorChildren

    try {
        index_h("div", [{ foreign: "object" }])
    } catch (e) {
        errorChildren = e
    }

    assert.ok(errorSingleChild);
    assert.ok(/Unexpected virtual child/.test(errorSingleChild.message))

    assert.ok(errorChildren);
    assert.ok(/Unexpected virtual child/.test(errorChildren.message))

    assert.end()
})

ext_test("h with class", function (assert) {
    var node = index_h(".foo")

    assert.equal(node.properties.className, "foo")

    assert.end()
})

ext_test("h with id", function (assert) {
    var node = index_h("#foo")

    assert.equal(node.properties.id, "foo")

    assert.end()
})

ext_test("h with empty string", function (assert) {
    var node = index_h("")

    assert.equal(node.tagName, "DIV")

    assert.end()
})

ext_test("h with two classes", function (assert) {
    var node = index_h(".foo", { className: "bar" })

    assert.equal(node.properties.className, "foo bar")

    assert.end()
})

ext_test("h with two ids", function (assert) {
    var node = index_h("#foo", { id: "bar" })

    assert.equal(node.properties.id, "bar")

    assert.end()
})
