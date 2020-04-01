"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _diffProps = require("../diff-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("add attributes to empty attributes", function (assert) {
    var propsA = {
        attributes: {}
    };
    var propsB = {
        attributes: {
            class: "standard",
            "e-text": "custom"
        }
    };

    var diff = (0, _diffProps.diffProps)(propsA, propsB);
    assert.equal(diff.attributes.class, "standard");
    assert.equal(diff.attributes["e-text"], "custom");

    assert.end();
});
