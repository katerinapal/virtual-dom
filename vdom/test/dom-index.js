import ext_test from "tape";
import { VirtualNode as VNode } from "../../vnode/vnode";
import { VirtualText as VText } from "../../vnode/vtext";
import { diff as diff_diff } from "../../vtree/diff";
import { createElement as createelement_createElement } from "../create-element";
import { patch as patch_patch } from "../patch";

ext_test("indexing over thunk root", function (assert) {
    var leftThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className:"test"
            }, [new VText("Left")]);
        }
    }

    var rightThunk = {
        type: "Thunk",
        render: function () {
            return new VNode("div", {
                className: "test"
            }, [new VText("Right")]);
        }
    }

    var root = createelement_createElement(leftThunk)
    var patches = diff_diff(leftThunk, rightThunk)
    var newRoot = patch_patch(root, patches)

    assert.equal(newRoot.childNodes[0].data, "Right")
    assert.end()
})

ext_test("indexing over thunk child", function (assert) {
    var leftNode = new VNode("div", {
        className: "parent-node"
    }, [
        new VNode("div"),
        new VText("test"),
        {
            type: "Thunk",
            render: function () {
                return new VNode("div", {
                    className:"test"
                }, [new VText("Left")]);
            }
        },
        new VNode("div"),
        new VText("test")
    ])

    var rightNode = new VNode("div", {
        className: "parent-node"
    }, [
        new VNode("div"),
        new VText("test"),
        {
            type: "Thunk",
            render: function () {
                return new VNode("div", {
                    className:"test"
                }, [new VText("Right")]);
            }
        },
        new VNode("div"),
        new VText("test")
    ])

    var root = createelement_createElement(leftNode)
    var patches = diff_diff(leftNode, rightNode)
    patch_patch(root, patches)
    assert.equal(root.childNodes[2].childNodes[0].data, "Right")
    assert.end()
})
