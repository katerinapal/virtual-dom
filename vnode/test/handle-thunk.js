import ext_test from "tape";
import { handleThunk as handlethunk_handleThunk } from "../handle-thunk";
import { VirtualNode as VNode } from "../vnode";
import { VirtualText as VText } from "../vtext";

ext_test("render a new thunk to vnode", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var renderedBNode = new VNode("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handlethunk_handleThunk(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

ext_test("render a new thunk to vtext", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var renderedBNode = new VText("text")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handlethunk_handleThunk(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

ext_test("render a new thunk to a widget", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var renderedBNode = { type: "Widget" }

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handlethunk_handleThunk(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

ext_test("render current thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new VNode("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return { type: "Thunk" }
        },
        type: "Thunk"
    }

    var result

    try {
        handlethunk_handleThunk(aNode, bNode)
    } catch (e) {
        result = e
    }

    assert.equal(result.message, "thunk did not return a valid node")
    assert.end()
})

ext_test("render previous thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.equal(previous, null)
            return { type: "Thunk" }
        },
        type: "Thunk"
    }

    var renderedBNode = new VNode("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result

    try {
        handlethunk_handleThunk(aNode, bNode)
    } catch (e) {
        result = e
    }

    assert.equal(result.message, "thunk did not return a valid node")
    assert.end()
})

ext_test("normal nodes are returned", function (assert) {
    var aNode = new VNode('div')
    var bNode = new VNode('div')

    var result = handlethunk_handleThunk(aNode, bNode)

    assert.equal(result.a, aNode)
    assert.equal(result.b, bNode)
    assert.end()
})

