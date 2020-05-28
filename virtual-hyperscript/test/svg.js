import ext_tape_test from "tape";
import ext_globaldocument_doc from "global/document";
import { AttributeHook as hooksattributehook_AttributeHookjs } from "../hooks/attribute-hook";

ext_tape_test("svg returns a vnode", function (assert) {
    assert.equal(svg_svgjs("circle").tagName, "circle")
    assert.equal(svg_svgjs("circle").namespace, "http://www.w3.org/2000/svg")

    assert.end()
})

ext_tape_test("svg with text", function (assert) {
    var node = svg_svgjs("circle", "dat text")

    assert.equal(node.children[0].text, "dat text")

    assert.end()
})

ext_tape_test("svg with properties", function (assert) {
    var node = svg_svgjs("circle", { width: "40px" })

    assert.strictEqual(node.properties.attributes.width, "40px")

    assert.end()
})

ext_tape_test("svg properties are set", function (assert) {
    var node = svg_svgjs("circle.test", {
        style: {
            border: "1px solid #000"
        },
        width: "40px"
    })

    assert.strictEqual(node.properties.attributes.width, "40px")
    assert.strictEqual(node.properties.width, undefined)
    assert.strictEqual(
        node.properties.style.border,
        safeStyle("boder", "1px solid #000")
    )

    assert.end()
})

ext_tape_test("namespaced attributes are set with correct namespace", function(assert) {
    var node = svg_svgjs("image", {
        "xlink:href": "http://example.com/image.png",
        "xml:space": "preserve",
     })

    assert.strictEqual(node.properties.attributes["xlink:href"], undefined)
    assert.strictEqual(node.hooks["xlink:href"].constructor, hooksattributehook_AttributeHookjs)
    assert.strictEqual(node.hooks["xlink:href"].value, "http://example.com/image.png")
    assert.strictEqual(node.hooks["xlink:href"].namespace, "http://www.w3.org/1999/xlink")

    assert.strictEqual(node.properties.attributes["xml:space"], undefined)
    assert.strictEqual(node.hooks["xml:space"].constructor, hooksattributehook_AttributeHookjs)
    assert.strictEqual(node.hooks["xml:space"].value, "preserve")
    assert.strictEqual(node.hooks["xml:space"].namespace, "http://www.w3.org/XML/1998/namespace")

    assert.end()
})

function safeStyle(property, value) {
    var div = ext_globaldocument_doc.createElement("div")
    div.style[property] = value
    return div.style[property]
}
