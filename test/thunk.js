"use strict";

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _isThunk = require("../vnode/is-thunk");

var _isVnode = require("../vnode/is-vnode");

var _vnode = require("../vnode/vnode");

var _diff = require("../diff.js");

var _patchCount = require("./lib/patch-count.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Thunk(tagName) {
    this.tagName = tagName;
}

Thunk.prototype.render = function () {
    return new _vnode.VirtualNode(this.tagName);
};

Thunk.prototype.type = "Thunk";

(0, _tape2.default)("is thunk", function (assert) {
    var notThunk = {};
    var thunkLiteral = {
        type: "Thunk",
        render: function render() {}
    };

    assert.notOk((0, _isThunk.isThunk)(notThunk));
    assert.ok((0, _isThunk.isThunk)(thunkLiteral));
    assert.ok((0, _isThunk.isThunk)(new Thunk("div")));
    assert.end();
});

(0, _tape2.default)("null or undefined previous renders thunk", function (assert) {
    var n = new Thunk("first");
    var u = new Thunk("second");
    var nullPatches = (0, _diff.diff)(null, n);
    var undefPatches = (0, _diff.diff)(undefined, u);

    assert.ok((0, _isVnode.isVirtualNode)(n.vnode));
    assert.ok((0, _isVnode.isVirtualNode)(u.vnode));
    assert.equal(n.vnode.tagName, "first");
    assert.equal(u.vnode.tagName, "second");
    assert.equal((0, _patchCount.patchCount)(nullPatches), 1);
    assert.equal((0, _patchCount.patchCount)(undefPatches), 1);
    assert.end();
});

(0, _tape2.default)("previous thunk passed to render", function (assert) {
    var renderCount = 0;

    var previousThunk = new Thunk("div");

    var nextThunk = {
        type: "Thunk",
        render: function render(previous) {
            renderCount++;
            assert.equal(previous, previousThunk);
            return new _vnode.VirtualNode("test");
        }
    };

    var patches = (0, _diff.diff)(previousThunk, nextThunk);

    assert.equal(renderCount, 1);
    assert.equal((0, _patchCount.patchCount)(patches), 1);
    assert.ok((0, _isVnode.isVirtualNode)(nextThunk.vnode));
    assert.equal(nextThunk.vnode.tagName, "test");
    assert.end();
});