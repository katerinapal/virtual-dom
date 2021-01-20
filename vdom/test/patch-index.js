import ext_test from "tape";
import { VirtualNode as VNode } from "../../vnode/vnode";
import { patch as patch_patch } from "../patch";

ext_test("overrided patch function is correctly used and received correct options", function (assert) {

    function patchCustom(rootNode, patches, renderOptions) {
        return {
            rootNode: rootNode,
            patches: patches,
            renderOptions: renderOptions
        }
    }
    function createElementCustom(vnode) {}

    var rootNode = new VNode("div")
    var patches = {}
    var renderOptions = { patch: patchCustom, render: createElementCustom }

    var result = patch_patch(rootNode, patches, renderOptions)
    assert.equal(result.rootNode, rootNode)
    assert.equal(result.patches, patches)
    assert.equal(result.renderOptions, renderOptions)
    assert.end()
})