import ext_test from "tape";
import { VirtualNode as VNode } from "../../vnode/vnode";
import { VirtualText as VText } from "../../vnode/vtext";
import { diff as diff_diff } from "../../vtree/diff";
import ext_document from "global/document";
import { createElement as createelement_createElement } from "../create-element";
import { patch as patch_patch } from "../patch";

var createElementCustom = function(vnode) {
    var created = createelement_createElement(vnode)
    created.customCreation = true
    return created
}

function assertPachedNodeIsMarked(leftNode, rightNode, assert) {
    var root = createElementCustom(leftNode)
    var patches = diff_diff(leftNode, rightNode)
    var newRoot = patch_patch(root, patches, { render: createElementCustom })
    assert.equal(newRoot.childNodes[0].customCreation, true)
    assert.end()
}

ext_test("overrided createElement is used on node insertion", function (assert) {
    var leftNode = new VNode("div")
    var rightNode = new VNode("div", {}, [new VNode("div")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

ext_test("overrided createElement is used for patching vnodes", function (assert) {
    var leftNode = new VNode("div", {}, [new VNode("div")])
    var rightNode = new VNode("div", {}, [new VNode("span")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

ext_test("overrided createElement is used for patching text nodes", function (assert) {
    var leftNode = new VNode("div", {}, [new VNode("div")])
    var rightNode = new VNode("div", {}, [new VText("hello")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

ext_test("overrided createElement is used for patching widget nodes", function (assert) {
    var Widget = function (){}
    Widget.prototype.type = "Widget"
    Widget.prototype.init = function(){ return ext_document.createElement("div"); }
    Widget.prototype.update = function(previous, domNode){ return null }
    Widget.prototype.destroy = function(domNode){}

    var leftNode = new VNode("div", {}, [new VNode("div")])
    var rightNode = new VNode("div", {}, [new Widget()])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})
