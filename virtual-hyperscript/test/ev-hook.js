"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _evStore = require("ev-store");

var _evStore2 = _interopRequireDefault(_evStore);

var _index = require("../index.js");

var _createElement = require("../../vdom/create-element");

var _patch = require("../../vdom/patch");

var _diff = require("../../vtree/diff");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)("h with events", function (assert) {
    function one() {}

    var left = (0, _index.h)(".foo", {
        "ev-click": one
    });

    var right = (0, _index.h)(".bar", {});

    var elem = (0, _createElement.createElement)(left);

    var ds1 = (0, _evStore2.default)(elem);
    assert.ok(ds1);
    assert.equal(ds1.click, one);

    var patches = (0, _diff.diff)(left, right);

    (0, _patch.patch)(elem, patches);

    var ds2 = (0, _evStore2.default)(elem);
    assert.ok(ds2);
    assert.equal(ds1, ds2);
    assert.equal(ds2.click, undefined);

    assert.end();
});
