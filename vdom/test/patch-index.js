import ext_tape_test from "tape";
import { VirtualNode as vnodevnode_VirtualNodejs } from "../../vnode/vnode";

ext_tape_test("overrided patch function is correctly used and received correct options", function (assert) {

    function patchCustom(rootNode, patches, renderOptions) {
        return {
            rootNode: rootNode,
            patches: patches,
            renderOptions: renderOptions
        }
    }
    function createElementCustom(vnode) {}

    var rootNode = new vnodevnode_VirtualNodejs("div")
    var patches = {}
    var renderOptions = { patch: patchCustom, render: createElementCustom }

    var result = patch_patchjs(rootNode, patches, renderOptions)
    assert.equal(result.rootNode, rootNode)
    assert.equal(result.patches, patches)
    assert.equal(result.renderOptions, renderOptions)
    assert.end()
})