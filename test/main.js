"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _h = require("../h.js");

var _diff = require("../diff.js");

var _patch = require("../patch.js");

var _createElement = require("../create-element.js");

var _vnode = require("../vnode/vnode");

var _vtext = require("../vnode/vtext");

var _version = require("../vnode/version");

var _assertEqualDom = require("./lib/assert-equal-dom.js");

var _patchCount = require("./lib/patch-count.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// VirtualNode tests
(0, _tape2.default)("Node is a function", function (assert) {
    assert.equal(typeof _vnode.VirtualNode === "undefined" ? "undefined" : _typeof(_vnode.VirtualNode), "function");
    assert.end();
});

(0, _tape2.default)("Node type and version are set", function (assert) {
    assert.equal(_vnode.VirtualNode.prototype.type, "VirtualNode");
    assert.deepEqual(_vnode.VirtualNode.prototype.version, _version.versionjs);
    assert.end();
});

(0, _tape2.default)("TextNode is a function", function (assert) {
    assert.equal(typeof _vtext.VirtualText === "undefined" ? "undefined" : _typeof(_vtext.VirtualText), "function");
    assert.end();
});

(0, _tape2.default)("TextNode type and version are set", function (assert) {
    assert.equal(_vtext.VirtualText.prototype.type, "VirtualText");
    assert.deepEqual(_vtext.VirtualText.prototype.version, _version.versionjs);
    assert.end();
});

// h tests

(0, _tape2.default)("h is a function", function (assert) {
    assert.equal(_h.h, "function");
    assert.end();
});

(0, _tape2.default)("defaults to div node", function (assert) {
    var node = _h.h;
    assertNode(assert, node, "DIV");
    assert.end();
});

(0, _tape2.default)("can use class selector", function (assert) {
    var node = _h.h;
    assertNode(assert, node, "DIV", { className: "pretty" });
    assert.end();
});

(0, _tape2.default)("can use non-ascii class selector", function (assert) {
    var node = _h.h;
    assertNode(assert, node, "DIV", { className: "ΑΒΓΔΕΖ" });
    assert.end();
});

(0, _tape2.default)("class selectors combine with className property", function (assert) {
    var node = _h.h;
    assertNode(assert, node, "DIV", { className: "very pretty" });
    assert.end();
});

(0, _tape2.default)("can use id selector", function (assert) {
    var node = _h.h;
    assertNode(assert, node, "DIV", { id: "important" });
    assert.end();
});

(0, _tape2.default)("can use non-ascii id selector", function (assert) {
    var node = _h.h;
    assertNode(assert, node, "DIV", { id: "ΑΒΓΔΕΖ" });
    assert.end();
});

(0, _tape2.default)("properties id overrides selector id", function (assert) {
    var node = _h.h;
    assertNode(assert, node, "DIV", { id: "important" });
    assert.end();
});

(0, _tape2.default)("defaults to div when using selectors", function (assert) {
    var node1 = _h.h;
    var node2 = _h.h;
    var node3 = _h.h;
    var node4 = _h.h;

    assertNode(assert, node1, "DIV", { id: "important" });
    assertNode(assert, node2, "DIV", { className: "pretty" });
    assertNode(assert, node3, "DIV", { id: "important", className: "pretty" });
    assertNode(assert, node4, "DIV", { id: "important", className: "pretty" });
    assert.end();
});

(0, _tape2.default)("second argument can be children", function (assert) {
    var node1 = _h.h;
    var node2 = _h.h;
    var node3 = _h.h;
    var node4 = _h.h;

    var props = { id: "important", className: "pretty" };

    assertNode(assert, node1, "DIV", props, ["test"]);
    assertNode(assert, node2, "DIV", props, ["test"]);
    assertNode(assert, node3, "DIV", props, [["P", {}, ["testing"]]]);
    assertNode(assert, node4, "DIV", props, [["P", {}, ["testing"]]]);
    assert.end();
});

(0, _tape2.default)("third argument can be child or children", function (assert) {
    var node1 = _h.h;
    var node2 = _h.h;
    var node3 = _h.h;
    var node4 = _h.h;

    var props = { a: "b", id: "important", className: "pretty" };

    assertNode(assert, node1, "DIV", props, ["test"]);
    assertNode(assert, node2, "DIV", props, ["test"]);
    assertNode(assert, node3, "DIV", props, [["P", {}, ["testing"]]]);
    assertNode(assert, node4, "DIV", props, [["P", {}, ["testing"]]]);
    assert.end();
});

function assertNode(assert, node, tagName, properties, children) {
    properties = properties || {};
    children = children || [];

    assert.ok(node instanceof _vnode.VirtualNode, "node is a VirtualNode");
    assert.equal(node.tagName, tagName, "tag names are equal");
    assert.deepEqual(node.properties, properties, "propeties are equal");
    assert.equal(node.children.length, children.length, "child count equal");
    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (typeof child === "string") {
            assert.equal(node.children[i].text, child);
        } else {
            assertNode(assert, node.children[i], child[0], child[1], child[2]);
        }
    }
}

// render tests
(0, _tape2.default)("render is a function", function (assert) {
    assert.equal(_h.h, "function");
    assert.end();
});

(0, _tape2.default)("render text node", function (assert) {
    var vdom = _h.h;
    var dom = _createElement.createElement;
    assert.equal(dom.tagName, "SPAN");
    assert.notOk(dom.id);
    assert.notOk(dom.className);
    assert.equal(dom.childNodes.length, 1);
    assert.equal(dom.childNodes[0].data, "hello");
    assert.end();
});

(0, _tape2.default)("render div", function (assert) {
    var vdom = _h.h;
    var dom = _createElement.createElement;
    assert.notOk(dom.id);
    assert.notOk(dom.className);
    assert.equal(dom.tagName, "DIV");
    assert.equal(dom.childNodes.length, 0);
    assert.end();
});

(0, _tape2.default)("node id is applied correctly", function (assert) {
    var vdom = _h.h;
    var dom = _createElement.createElement;
    assert.equal(dom.id, "important");
    assert.notOk(dom.className);
    assert.equal(dom.tagName, "DIV");
    assert.equal(dom.childNodes.length, 0);
    assert.end();
});

(0, _tape2.default)("node class name is applied correctly", function (assert) {
    var vdom = _h.h;
    var dom = _createElement.createElement;
    assert.notOk(dom.id);
    assert.equal(dom.className, "pretty");
    assert.equal(dom.tagName, "DIV");
    assert.equal(dom.childNodes.length, 0);
    assert.end();
});

(0, _tape2.default)("mixture of node/classname applied correctly", function (assert) {
    var vdom = _h.h;
    var dom = _createElement.createElement;
    assert.equal(dom.id, "important");
    assert.equal(dom.className, "very pretty");
    assert.equal(dom.tagName, "DIV");
    assert.equal(dom.childNodes.length, 0);
    assert.end();
});

(0, _tape2.default)("style object is applied correctly", function (assert) {
    var vdom = _h.h;
    var dom = _createElement.createElement;
    assert.equal(dom.id, "important");
    assert.equal(dom.className, "pretty");
    assert.equal(dom.tagName, "DIV");
    assert.equal(dom.style.border, style("border", "1px solid rgb(0, 0, 0)"));
    assert.equal(dom.style.padding, style("padding", "2px"));
    assert.equal(dom.childNodes.length, 0);
    assert.end();
});

(0, _tape2.default)("children are added", function (assert) {
    var vdom = _h.h;

    var dom = _createElement.createElement;

    assert.equal(dom.childNodes.length, 3);

    var nodes = dom.childNodes;
    assert.equal(nodes.length, 3);
    assert.equal(nodes[0].tagName, "DIV");
    assert.equal(nodes[1].data, "hello");
    assert.equal(nodes[2].tagName, "SPAN");

    var subNodes0 = nodes[0].childNodes;
    assert.equal(subNodes0.length, 3);
    assert.equal(subNodes0[0].data, "just testing");
    assert.equal(subNodes0[1].data, "multiple");
    assert.equal(subNodes0[2].tagName, "B");

    var subNodes0_2 = subNodes0[2].childNodes;
    assert.equal(subNodes0_2.length, 1);
    assert.equal(subNodes0_2[0].data, "nodes");

    var subNodes2 = nodes[2].childNodes;
    assert.equal(subNodes2.length, 1);
    assert.equal(subNodes2[0].data, "test");
    assert.end();
});

(0, _tape2.default)("incompatible children are ignored", function (assert) {
    var vdom = _h.h;
    var dom = _createElement.createElement;
    assert.equal(dom.id, "important");
    assert.equal(dom.className, "pretty");
    assert.equal(dom.tagName, "DIV");
    assert.equal(dom.style.cssText, style("cssText", "color: red;"));
    assert.equal(dom.childNodes.length, 0);
    assert.end();
});

(0, _tape2.default)("injected document object is used", function (assert) {
    var vdom = _h.h;
    var count = 0;
    var doc = {
        createElement: function createElement(tagName) {
            assert.equal(tagName, "DIV");
            count++;
            return { tagName: "DIV", appendChild: function appendChild(t) {
                    assert.equal(t, "hello");
                    count++;
                } };
        },
        createTextNode: function createTextNode(text) {
            assert.equal(text, "hello");
            count++;
            return text;
        }
    };
    _createElement.createElement;
    assert.equal(count, 3);
    assert.end();
});

(0, _tape2.default)("injected warning is used", function (assert) {
    var badObject = {};
    var vdom = _h.h;

    vdom.children = [badObject, null];

    var i = 0;
    function warn(warning, node) {
        assert.equal(warning, "Item is not a valid virtual dom node");

        if (i === 0) {
            assert.equal(node, badObject);
        } else if (i === 1) {
            assert.equal(node, null);
        } else {
            assert.error("Too many warnings");
        }

        i++;
    }

    var dom = _createElement.createElement;
    assert.equal(dom.id, "important");
    assert.equal(dom.className, "pretty");
    assert.equal(dom.tagName, "DIV");
    assert.equal(dom.style.cssText, style("cssText", "color: red;"));
    assert.equal(dom.childNodes.length, 0);
    assert.equal(i, 2);
    assert.end();
});

// Complete patch tests
(0, _tape2.default)("textnode update test", function (assert) {
    var hello = _h.h;
    var goodbye = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("textnode replace test", function (assert) {
    var hello = _h.h;
    var goodbye = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("textnode insert test", function (assert) {
    var hello = _h.h;
    var again = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("textnode remove", function (assert) {
    var again = _h.h;
    var hello = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("dom node update test", function (assert) {
    var hello = _h.h;
    var goodbye = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("dom node replace test", function (assert) {
    var hello = _h.h;
    var goodbye = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("dom node insert", function (assert) {
    var hello = _h.h;
    var again = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("dom node remove", function (assert) {
    var hello = _h.h;
    var again = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);
    assert.end();
});

(0, _tape2.default)("reuse dom node without breaking", function (assert) {
    var hSpan = _h.h;
    var hello = _h.h;
    var goodbye = _h.h;
    var rootNode = _createElement.createElement;
    var equalNode = _createElement.createElement;
    var patches = _diff.diff;
    var newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, equalNode);

    // Undo the rendering with new trees
    hello = _h.h;
    goodbye = _h.h;
    patches = _diff.diff;
    newRoot = _patch.patch;
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, rootNode);

    assert.end();
});

(0, _tape2.default)("Allow empty textnode", function (assert) {
    var empty = _h.h;
    var rootNode = _createElement.createElement;
    assert.equal(rootNode.childNodes.length, 1);
    assert.equal(rootNode.childNodes[0].data, "");
    assert.end();
});

(0, _tape2.default)("Can replace vnode with vtext", function (assert) {

    var leftNode = _h.h;
    var rightNode = _h.h;

    var rootNode = _createElement.createElement;

    assert.equal(rootNode.childNodes.length, 1);
    assert.equal(rootNode.childNodes[0].nodeType, 1);

    var patches = _diff.diff;

    var newRoot = _patch.patch;

    assert.equal(newRoot, rootNode);

    assert.equal(newRoot.childNodes.length, 1);
    assert.equal(newRoot.childNodes[0].nodeType, 3);

    assert.end();
});

// Widget tests
(0, _tape2.default)("Widget is initialised on render", function (assert) {
    var initCount = 0;
    var testNode = _createElement.createElement;
    var Widget = {
        init: function init() {
            initCount++;
            return testNode;
        },
        update: function update() {
            initCount = 1000000;
        },
        type: "Widget"
    };

    var result = _createElement.createElement;

    assert.equal(initCount, 1);
    assert.equal(result, testNode);
    assert.end();
});

(0, _tape2.default)("Nested widget is initialised on render", function (assert) {
    var initCount = 0;
    var testNode = _createElement.createElement;
    var Widget = {
        init: function init() {
            initCount++;
            return testNode;
        },
        update: function update() {
            initCount = 1000000;
        },
        type: "Widget"
    };

    var vdom = _h.h;

    var result = _createElement.createElement;

    assert.equal(initCount, 1);
    assert.equal(result.childNodes[1].childNodes[0], testNode);
    assert.end();
});

(0, _tape2.default)("Patch widgets at the root", function (assert) {
    var initCount = 0;
    var updateCount = 0;
    var leftState = { a: 1 };
    var rightState = { a: 2 };
    var domNode;

    function Widget(state) {
        this.state = state;
        this.vdom = this.render(state);
    }

    Widget.prototype.init = function () {
        initCount++;
        return _createElement.createElement;
    };

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++;
        assert.equal(this.state, rightState);
        assert.equal(leftNode.state, leftState);
        assert.equal(dom, domNode);
        _patch.patch;
    };

    Widget.prototype.render = function (state) {
        return _h.h;
    };

    Widget.prototype.type = "Widget";

    var leftTree = new Widget(leftState);
    var rightTree = new Widget(rightState);
    domNode = _createElement.createElement;
    assert.equal(initCount, 1, "initCount after left render");
    assert.equal(updateCount, 0, "updateCount after left render");

    var patches = _diff.diff;
    assert.equal((0, _patchCount.patchCount)(patches), 1);
    assert.equal(initCount, 1, "initCount after diff");
    assert.equal(updateCount, 0, "updateCount after diff");

    var newRoot = _patch.patch;
    assert.equal(initCount, 1, "initCount after patch");
    assert.equal(updateCount, 1, "updateCount after patch");

    // The patch should only update sibling value in this use case
    var expectedNode = _createElement.createElement;
    assert.equal(newRoot, domNode);
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, expectedNode);
    assert.end();
});

(0, _tape2.default)("Patch nested widgets", function (assert) {
    var initCount = 0;
    var updateCount = 0;
    var leftState = { a: 1 };
    var rightState = { a: 2 };
    var domNode;

    function Widget(state) {
        this.state = state;
        this.vdom = this.render(state);
    }

    Widget.prototype.init = function () {
        initCount++;
        return _createElement.createElement;
    };

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++;
        assert.equal(this.state, rightState);
        assert.equal(leftNode.state, leftState);
        assert.equal(dom, domNode.childNodes[1].childNodes[0]);
        _patch.patch;
    };

    Widget.prototype.render = function (state) {
        return _h.h;
    };

    Widget.prototype.type = "Widget";

    var leftWidget = new Widget(leftState);
    var rightWidget = new Widget(rightState);

    var leftTree = _h.h;

    var rightTree = _h.h;

    domNode = _createElement.createElement;
    assert.equal(initCount, 1, "initCount after left render");
    assert.equal(updateCount, 0, "updateCount after left render");

    var patches = _diff.diff;
    assert.equal((0, _patchCount.patchCount)(patches), 1);
    assert.equal(initCount, 1, "initCount after diff");
    assert.equal(updateCount, 0, "updateCount after diff");

    var newRoot = _patch.patch;
    assert.equal(initCount, 1, "initCount after patch");
    assert.equal(updateCount, 1, "updateCount after patch");

    // The patch should only update sibling value in this use case
    var expectedNode = _createElement.createElement;
    assert.equal(newRoot, domNode);
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, expectedNode);
    assert.end();
});

(0, _tape2.default)("Can replace stateful widget with vnode", function (assert) {
    var statefulWidget = {
        init: function init() {
            return _createElement.createElement;
        },
        update: function update() {},
        destroy: function destroy() {},
        type: "Widget"
    };

    var leftNode = _h.h;
    var rightNode = _h.h;

    var rootNode = _createElement.createElement;

    assert.equal(rootNode.childNodes.length, 1);
    assert.equal(rootNode.childNodes[0].className, 'widget');

    var patches = _diff.diff;

    var newRoot = _patch.patch;

    assert.equal(newRoot, rootNode);

    assert.equal(newRoot.childNodes.length, 1);
    assert.equal(newRoot.childNodes[0].className, 'vnode');

    assert.end();
});

(0, _tape2.default)("Can replace vnode with stateful widget with vnode", function (assert) {
    var statefulWidget = {
        init: function init() {
            return _createElement.createElement;
        },
        update: function update() {},
        destroy: function destroy() {},
        type: "Widget"
    };

    var leftNode = _h.h;
    var rightNode = _h.h;

    var rootNode = _createElement.createElement;

    assert.equal(rootNode.childNodes.length, 1);
    assert.equal(rootNode.childNodes[0].className, 'vnode');

    var patches = _diff.diff;

    var newRoot = _patch.patch;

    assert.equal(newRoot, rootNode);

    assert.equal(newRoot.childNodes.length, 1);
    assert.equal(newRoot.childNodes[0].className, 'widget');

    assert.end();
});

(0, _tape2.default)("Ensure children are not rendered more than once", function (assert) {
    var initCount = 0;
    var updateCount = 0;
    var rightState = { a: 1 };
    var domNode;

    function Widget(state) {
        this.state = state;
        this.vdom = this.render(state);
    }

    Widget.prototype.init = function () {
        initCount++;
        return _createElement.createElement;
    };

    Widget.prototype.update = function (leftNode, dom) {
        updateCount++;
        _patch.patch;
    };

    Widget.prototype.render = function (state) {
        return _h.h;
    };

    Widget.prototype.type = "Widget";

    var rightWidget = new Widget(rightState);

    var leftTree = _h.h;

    var rightTree = _h.h;

    domNode = _createElement.createElement;
    assert.equal(initCount, 0, "initCount after left render");
    assert.equal(updateCount, 0, "updateCount after left render");

    var patches = _diff.diff;
    assert.equal((0, _patchCount.patchCount)(patches), 1);
    assert.equal(initCount, 0, "initCount after diff");
    assert.equal(updateCount, 0, "updateCount after diff");

    var newRoot = _patch.patch;
    assert.equal(initCount, 1, "initCount after patch");
    assert.equal(updateCount, 0, "updateCount after patch");

    // The patch should only update sibling value in this use case
    var expectedNode = _createElement.createElement;
    assert.equal(newRoot, domNode);
    (0, _assertEqualDom.assertEqualDom)(assert, newRoot, expectedNode);
    assert.end();
});

(0, _tape2.default)("VNode indicates stateful sibling", function (assert) {
    var statefulWidget = {
        init: function init() {},
        update: function update() {},
        destroy: function destroy() {},
        type: "Widget"
    };

    var pureWidget = {
        init: function init() {},
        update: function update() {},
        type: "Widget"
    };

    var stateful = _h.h;
    var pure = _h.h;

    assert.ok(stateful.hasWidgets);
    assert.notOk(pure.hasWidgets);
    assert.end();
});

(0, _tape2.default)("Replacing stateful widget with vnode calls destroy", function (assert) {
    var count = 0;
    var statefulWidget = {
        init: function init() {},
        update: function update() {},
        destroy: function destroy() {
            count++;
        },
        type: "Widget"
    };

    var rootNode = _createElement.createElement;
    _patch.patch;
    assert.equal(count, 1);
    assert.end();
});

(0, _tape2.default)("Replacing stateful widget with stateful widget", function (assert) {
    var count = 0;
    var statefulWidget = {
        init: function init() {},
        update: function update() {},
        destroy: function destroy() {
            count++;
        },
        type: "Widget"
    };

    var newWidget = {
        init: function init() {},
        update: function update() {},
        destroy: function destroy() {
            count = 10000000;
        },
        type: "Widget"
    };

    var rootNode = _createElement.createElement;
    var patches = _diff.diff;
    _patch.patch;
    assert.equal(count, 1);
    assert.end();
});

(0, _tape2.default)("Replacing stateful widget with pure widget", function (assert) {
    var count = 0;
    var statefulWidget = {
        init: function init() {},
        update: function update() {},
        destroy: function destroy() {
            count++;
        },
        type: "Widget"
    };

    var newWidget = {
        init: function init() {},
        update: function update() {},
        type: "Widget"
    };

    var rootNode = _createElement.createElement;
    _patch.patch;
    assert.equal(count, 1);
    assert.end();
});

(0, _tape2.default)("Removing stateful widget calls destroy", function (assert) {
    var count = 0;
    var statefulWidget = {
        init: function init() {},
        update: function update() {},
        destroy: function destroy() {
            count++;
        },
        type: "Widget"
    };

    var rootNode = _createElement.createElement;
    _patch.patch;
    assert.equal(count, 1);
    assert.end();
});

(0, _tape2.default)("Patching parent destroys stateful sibling", function (assert) {
    var count = 0;
    var widgetRoot = _createElement.createElement;
    var statefulWidget = {
        init: function init() {
            return widgetRoot;
        },
        update: function update() {
            assert.error();
        },
        destroy: function destroy(domNode) {
            assert.equal(domNode, widgetRoot);
            count++;
        },
        type: "Widget"
    };

    var deepTree = _h.h;

    var rootNode;

    rootNode = _createElement.createElement;
    _patch.patch;
    assert.equal(count, 1);

    rootNode = _createElement.createElement;
    _patch.patch;
    assert.equal(count, 2);

    rootNode = _createElement.createElement;
    _patch.patch;
    assert.equal(count, 3);

    assert.end();
});

(0, _tape2.default)("Widget update can replace domNode", function (assert) {
    var widgetInit = _createElement.createElement;
    var widgetUpdate = _createElement.createElement;

    function Widget() {}
    Widget.prototype.init = function () {
        return widgetInit;
    };
    Widget.prototype.update = function () {
        return widgetUpdate;
    };
    Widget.prototype.destroy = function () {};
    Widget.prototype.type = "Widget";

    var initTree = _h.h;
    var updateTree = _h.h;
    var rootNode;

    rootNode = _createElement.createElement;
    assert.equal(rootNode.childNodes[0], widgetInit);

    _patch.patch;

    assert.equal(rootNode.childNodes[0], widgetUpdate);
    assert.end();
});

(0, _tape2.default)("Destroy widget nested in removed thunk", function (assert) {
    var count = 0;
    var widgetRoot = _createElement.createElement;
    var statefulWidget = {
        init: function init() {
            return widgetRoot;
        },
        update: function update() {
            assert.error();
        },
        destroy: function destroy(domNode) {
            assert.equal(domNode, widgetRoot);
            count++;
        },
        type: "Widget"
    };
    var vnode = _h.h;

    function Thunk() {}

    Thunk.prototype.render = function () {
        return vnode;
    };

    Thunk.prototype.type = "Thunk";

    var thunkTree = _h.h;

    var empty = _h.h;

    var rootNode = _createElement.createElement;
    _patch.patch;
    assert.equal(count, 1);

    assert.end();
});

(0, _tape2.default)("Create element respects namespace", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var svgURI = "http://www.w3.org/2000/svg";
    var vnode = new _vnode.VirtualNode("svg", {}, [], null, svgURI);
    var node = _createElement.createElement;

    assert.equal(node.tagName, "svg");
    assert.equal(node.namespaceURI, svgURI);
    assert.end();
});

(0, _tape2.default)("Different namespaces creates a patch", function (assert) {
    if (!supportsNamespace()) {
        assert.skip("browser doesn't support namespaces");
        return assert.end();
    }

    var leftNode = new _vnode.VirtualNode("div", {}, [], null, "testing");
    var rightNode = new _vnode.VirtualNode("div", {}, [], null, "undefined");

    var rootNode = _createElement.createElement;
    assert.equal(rootNode.tagName, "div");
    assert.equal(rootNode.namespaceURI, "testing");

    var patches = _diff.diff;
    assert.equal((0, _patchCount.patchCount)(patches), 1);

    rootNode = _patch.patch;

    assert.equal(rootNode.tagName, "div");
    assert.equal(rootNode.namespaceURI, "undefined");

    assert.end();
});

// Safely translates style values using the DOM in the browser
function style(name, value) {
    var node = _createElement.createElement;
    node.style[name] = value;
    return node.style[name];
}

// Determine if namespace is supported by the DOM
function supportsNamespace() {
    var node = _createElement.createElement;
    return 'namespaceURI' in node;
}
