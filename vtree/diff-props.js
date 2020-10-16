"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.diffProps = undefined;

var _isObject = require("is-object");

var _isObject2 = _interopRequireDefault(_isObject);

var _isVhook = require("../vnode/is-vhook");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var diffprops_diffProps = diffProps;


function diffProps(a, b) {
    var diff;

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {};
            diff[aKey] = undefined;
        }

        var aValue = a[aKey];
        var bValue = b[aKey];

        if (aValue === bValue) {
            continue;
        } else if ((0, _isObject2.default)(aValue) && (0, _isObject2.default)(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {};
                diff[aKey] = bValue;
            } else if ((0, _isVhook.isHook)(bValue)) {
                diff = diff || {};
                diff[aKey] = bValue;
            } else {
                var objectDiff = diffProps(aValue, bValue);
                if (objectDiff) {
                    diff = diff || {};
                    diff[aKey] = objectDiff;
                }
            }
        } else {
            diff = diff || {};
            diff[aKey] = bValue;
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {};
            diff[bKey] = b[bKey];
        }
    }

    return diff;
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
        return value.__proto__;
    } else if (value.constructor) {
        return value.constructor.prototype;
    }
}
exports.diffProps = diffprops_diffProps;