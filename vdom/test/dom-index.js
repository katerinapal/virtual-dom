import ext_tape_test from "tape";
import { VirtualNode as vnodevnode_VirtualNodejs } from "../../vnode/vnode";
import { VirtualText as vnodevtext_VirtualTextjs } from "../../vnode/vtext";
import { diff as vtreediff_diffjs } from "../../vtree/diff";
import { createElement as createelement_createElementjs } from "../create-element";

ext_tape_test("indexing over thunk root", function (assert) {
    var leftThunk = {
        type: "Thunk",
        render: function () {
            return new vnodevnode_VirtualNodejs("div", {
                className:"test"
            }, [new vnodevtext_VirtualTextjs("Left")]);
        }
    }

    var rightThunk = {
        type: "Thunk",
        render: function () {
            return new vnodevnode_VirtualNodejs("div", {
                className: "test"
            }, [new vnodevtext_VirtualTextjs("Right")]);
        }
    }

    var root = createelement_createElementjs(leftThunk)
    var patches = vtreediff_diffjs(leftThunk, rightThunk)
    var newRoot = patch_patchjs(root, patches)

    assert.equal(newRoot.childNodes[0].data, "Right")
    assert.end()
})

ext_tape_test("indexing over thunk child", function (assert) {
    var leftNode = new vnodevnode_VirtualNodejs("div", {
        className: "parent-node"
    }, [
        new vnodevnode_VirtualNodejs("div"),
        new vnodevtext_VirtualTextjs("test"),
        {
            type: "Thunk",
            render: function () {
                return new vnodevnode_VirtualNodejs("div", {
                    className:"test"
                }, [new vnodevtext_VirtualTextjs("Left")]);
            }
        },
        new vnodevnode_VirtualNodejs("div"),
        new vnodevtext_VirtualTextjs("test")
    ])

    var rightNode = new vnodevnode_VirtualNodejs("div", {
        className: "parent-node"
    }, [
        new vnodevnode_VirtualNodejs("div"),
        new vnodevtext_VirtualTextjs("test"),
        {
            type: "Thunk",
            render: function () {
                return new vnodevnode_VirtualNodejs("div", {
                    className:"test"
                }, [new vnodevtext_VirtualTextjs("Right")]);
            }
        },
        new vnodevnode_VirtualNodejs("div"),
        new vnodevtext_VirtualTextjs("test")
    ])

    var root = createelement_createElementjs(leftNode)
    var patches = vtreediff_diffjs(leftNode, rightNode)
    patch_patchjs(root, patches)
    assert.equal(root.childNodes[2].childNodes[0].data, "Right")
    assert.end()
})
