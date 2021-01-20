var mod_svg = svg;
import ext_isArray from "x-is-array";
import { h as index_h } from "./index.js";
import { SVGAttributeNamespace as svgattributenamespace_SVGAttributeNamespace } from "./svg-attribute-namespace";
import { AttributeHook as attributeHook } from "./hooks/attribute-hook";
'use strict';

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

function svg(tagName, properties, children) {
    if (!children && isChildren(properties)) {
        children = properties;
        properties = {};
    }

    properties = properties || {};

    // set namespace for svg
    properties.namespace = SVG_NAMESPACE;

    var attributes = properties.attributes || (properties.attributes = {});

    for (var key in properties) {
        if (!properties.hasOwnProperty(key)) {
            continue;
        }

        var namespace = svgattributenamespace_SVGAttributeNamespace(key);

        if (namespace === undefined) { // not a svg attribute
            continue;
        }

        var value = properties[key];

        if (typeof value !== 'string' &&
            typeof value !== 'number' &&
            typeof value !== 'boolean'
        ) {
            continue;
        }

        if (namespace !== null) { // namespaced attribute
            properties[key] = attributeHook(namespace, value);
            continue;
        }

        attributes[key] = value
        properties[key] = undefined
    }

    return index_h(tagName, properties, children);
}

function isChildren(x) {
    return typeof x === 'string' || ext_isArray(x);
}
export { mod_svg as svg };
