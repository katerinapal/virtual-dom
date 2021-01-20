import ext_test from "tape";
import { diffProps as diffprops_diffProps } from "../diff-props";

ext_test("add attributes to empty attributes", function (assert) {
    var propsA = {
      attributes : {}
    }
    var propsB = {
        attributes : {
            class : "standard",
            "e-text" : "custom"
        }
    }

    var diff = diffprops_diffProps(propsA,propsB)
    assert.equal(diff.attributes.class, "standard")
    assert.equal(diff.attributes["e-text"], "custom")

    assert.end()
})
