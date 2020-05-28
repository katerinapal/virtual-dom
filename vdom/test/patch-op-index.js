import ext_tape_test from "tape";
import { VirtualNode as vnodevnode_VirtualNodejs } from "../../vnode/vnode";
import { VirtualText as vnodevtext_VirtualTextjs } from "../../vnode/vtext";
import { diff as vtreediff_diffjs } from "../../vtree/diff";
import ext_globaldocument_document from "global/document";
import { createElement as createelement_createElementjs } from "../create-element";

var createElementCustom = function(vnode) {
    var created = createelement_createElementjs(vnode)
    created.customCreation = true
    return created
}

function assertPachedNodeIsMarked(leftNode, rightNode, assert) {
    var root = createElementCustom(leftNode)
    var patches = vtreediff_diffjs(leftNode, rightNode)
    var newRoot = patch_patchjs(root, patches, { render: createElementCustom })
    assert.equal(newRoot.childNodes[0].customCreation, true)
    assert.end()
}

ext_tape_test("overrided createElement is used on node insertion", function (assert) {
    var leftNode = new vnodevnode_VirtualNodejs("div")
    var rightNode = new vnodevnode_VirtualNodejs("div", {}, [new vnodevnode_VirtualNodejs("div")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

ext_tape_test("overrided createElement is used for patching vnodes", function (assert) {
    var leftNode = new vnodevnode_VirtualNodejs("div", {}, [new vnodevnode_VirtualNodejs("div")])
    var rightNode = new vnodevnode_VirtualNodejs("div", {}, [new vnodevnode_VirtualNodejs("span")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

ext_tape_test("overrided createElement is used for patching text nodes", function (assert) {
    var leftNode = new vnodevnode_VirtualNodejs("div", {}, [new vnodevnode_VirtualNodejs("div")])
    var rightNode = new vnodevnode_VirtualNodejs("div", {}, [new vnodevtext_VirtualTextjs("hello")])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})

ext_tape_test("overrided createElement is used for patching widget nodes", function (assert) {
    var Widget = function (){}
    Widget.prototype.type = "Widget"
    Widget.prototype.init = function(){ return ext_globaldocument_document.createElement("div"); }
    Widget.prototype.update = function(previous, domNode){ return null }
    Widget.prototype.destroy = function(domNode){}

    var leftNode = new vnodevnode_VirtualNodejs("div", {}, [new vnodevnode_VirtualNodejs("div")])
    var rightNode = new vnodevnode_VirtualNodejs("div", {}, [new Widget()])

    assertPachedNodeIsMarked(leftNode, rightNode, assert)
})
