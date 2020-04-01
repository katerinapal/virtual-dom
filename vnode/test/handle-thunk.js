import test from "tape";
import { handleThunk as handlethunk_handleThunkjs } from "../handle-thunk";
import { VirtualNode as vnode_VirtualNodejs } from "../vnode";
import { VirtualText as vtext_VirtualTextjs } from "../vtext";

test("render a new thunk to vnode", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new vnode_VirtualNodejs("div")

    var renderedBNode = new vnode_VirtualNodejs("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handlethunk_handleThunkjs(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

test("render a new thunk to vtext", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new vnode_VirtualNodejs("div")

    var renderedBNode = new vtext_VirtualTextjs("text")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handlethunk_handleThunkjs(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

test("render a new thunk to a widget", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new vnode_VirtualNodejs("div")

    var renderedBNode = { type: "Widget" }

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result = handlethunk_handleThunkjs(aNode, bNode)

    assert.equal(result.a, aNode.vnode)
    assert.equal(result.b, renderedBNode)
    assert.equal(bNode.vnode, renderedBNode)
    assert.end()
})

test("render current thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.error("Render should not be called for cached thunk")
        },
        type: "Thunk"
    }

    aNode.vnode = new vnode_VirtualNodejs("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return { type: "Thunk" }
        },
        type: "Thunk"
    }

    var result

    try {
        handlethunk_handleThunkjs(aNode, bNode)
    } catch (e) {
        result = e
    }

    assert.equal(result.message, "thunk did not return a valid node")
    assert.end()
})

test("render previous thunk to a thunk throws exception", function (assert) {
    var aNode = {
        render: function (previous) {
            assert.equal(previous, null)
            return { type: "Thunk" }
        },
        type: "Thunk"
    }

    var renderedBNode = new vnode_VirtualNodejs("div")

    var bNode = {
        render: function (previous) {
            assert.equal(previous, aNode)
            return renderedBNode
        },
        type: "Thunk"
    }

    var result

    try {
        handlethunk_handleThunkjs(aNode, bNode)
    } catch (e) {
        result = e
    }

    assert.equal(result.message, "thunk did not return a valid node")
    assert.end()
})

test("normal nodes are returned", function (assert) {
    var aNode = new vnode_VirtualNodejs('div')
    var bNode = new vnode_VirtualNodejs('div')

    var result = handlethunk_handleThunkjs(aNode, bNode)

    assert.equal(result.a, aNode)
    assert.equal(result.b, bNode)
    assert.end()
})

