"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.patches = undefined;

var _tape = require("tape");

var _tape2 = _interopRequireDefault(_tape);

var _document = require("global/document");

var _document2 = _interopRequireDefault(_document);

var _attributeHook = require("../hooks/attribute-hook.js");

var _index = require("../index.js");

var _createElement = require("../../vdom/create-element");

var _patch = require("../../vdom/patch");

var _diff = require("../../vtree/diff");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var patches;

(0, _tape2.default)("sets and removes namespaced attribute", function (assert) {
    var namespace = 'http://ns.com/my';

    var hook1 = (0, _attributeHook.AttributeHook)(namespace, 'first value');
    var hook2 = (0, _attributeHook.AttributeHook)(namespace, 'first value');
    var hook3 = (0, _attributeHook.AttributeHook)(namespace, 'second value');

    var first = (0, _index.h)('div', { 'myns:myattr': hook1 });
    var second = (0, _index.h)('div', { 'myns:myattr': hook2 });
    var third = (0, _index.h)('div', { 'myns:myattr': hook3 });
    var fourth = (0, _index.h)('div', {});

    var elem = (0, _createElement.createElement)(first);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value');

    var patches = (0, _diff.diff)(first, second);
    (0, _patch.patch)(elem, patches);
    // The value shouldn't change.
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'first value');

    patches = (0, _diff.diff)(second, third);
    (0, _patch.patch)(elem, patches);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'second value');

    patches = (0, _diff.diff)(third, fourth);
    (0, _patch.patch)(elem, patches);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS());

    assert.end();
});

(0, _tape2.default)("sets the attribute if previous value was not an AttributeHook", function (assert) {
    var namespace = 'http://ns.com/my';

    var OtherHook = function OtherHook(namespace, value) {
        this.namespace = namespace;
        this.value = value;
    };
    OtherHook.prototype.hook = function () {};

    var hook1 = new OtherHook(namespace, 'the value');
    var hook2 = (0, _attributeHook.AttributeHook)(namespace, 'the value');

    var first = (0, _index.h)('div', { 'myns:myattr': hook1 });
    var second = (0, _index.h)('div', { 'myns:myattr': hook2 });

    var elem = (0, _createElement.createElement)(first);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS());

    exports.patches = patches = (0, _diff.diff)(first, second);
    (0, _patch.patch)(elem, patches);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value');

    assert.end();
});

(0, _tape2.default)("sets the attribute if previous value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my';

    var hook1 = (0, _attributeHook.AttributeHook)('http://other.ns/', 'the value');
    var hook2 = (0, _attributeHook.AttributeHook)(namespace, 'the value');

    var first = (0, _index.h)('div', { 'myns:myattr': hook1 });
    var second = (0, _index.h)('div', { 'myns:myattr': hook2 });

    var elem = (0, _createElement.createElement)(first);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS());

    exports.patches = patches = (0, _diff.diff)(first, second);
    (0, _patch.patch)(elem, patches);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value');

    assert.end();
});

(0, _tape2.default)("removes the attribute if next value is not an AttributeHook", function (assert) {
    var namespace = 'http://ns.com/my';

    var OtherHook = function OtherHook(namespace, value) {
        this.namespace = namespace;
        this.value = value;
    };
    OtherHook.prototype.hook = function () {};

    var hook1 = (0, _attributeHook.AttributeHook)(namespace, 'the value');
    var hook2 = new OtherHook(namespace, 'the value');

    var first = (0, _index.h)('div', { 'myns:myattr': hook1 });
    var second = (0, _index.h)('div', { 'myns:myattr': hook2 });

    var elem = (0, _createElement.createElement)(first);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value');

    exports.patches = patches = (0, _diff.diff)(first, second);
    (0, _patch.patch)(elem, patches);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS());

    assert.end();
});

(0, _tape2.default)("removes the attribute if next value uses a different namespace", function (assert) {
    var namespace = 'http://ns.com/my';

    var hook1 = (0, _attributeHook.AttributeHook)(namespace, 'the value');
    var hook2 = (0, _attributeHook.AttributeHook)('http://other.ns/', 'the value');

    var first = (0, _index.h)('div', { 'myns:myattr': hook1 });
    var second = (0, _index.h)('div', { 'myns:myattr': hook2 });

    var elem = (0, _createElement.createElement)(first);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), 'the value');

    exports.patches = patches = (0, _diff.diff)(first, second);
    (0, _patch.patch)(elem, patches);
    assert.equal(elem.getAttributeNS(namespace, 'myattr'), blankAttributeNS());

    assert.end();
});

function blankAttributeNS() {
    // Most browsers conform to the latest version of the DOM spec,
    // which requires `getAttributeNS` to return `null` when the attribute
    // doesn't exist, but some browsers (including phantomjs) implement the
    // old version of the spec and return an empty string instead, see:
    // https://developer.mozilla.org/en-US/docs/Web/API/element.getAttributeNS#Return_value
    var div = _document2.default.createElement("div");
    return div.getAttributeNS(null, "foo");
}
exports.patches = patches;