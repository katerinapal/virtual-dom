import ext_tape_test from "tape";
import { diffProps as diffprops_diffPropsjs } from "../diff-props";

ext_tape_test("add attributes to empty attributes", function (assert) {
    var propsA = {
      attributes : {}
    }
    var propsB = {
        attributes : {
            class : "standard",
            "e-text" : "custom"
        }
    }

    var diff = diffprops_diffPropsjs(propsA,propsB)
    assert.equal(diff.attributes.class, "standard")
    assert.equal(diff.attributes["e-text"], "custom")

    assert.end()
})
