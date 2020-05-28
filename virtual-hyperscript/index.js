var index_h = h;
import ext_xisarray_isArray from "x-is-array";
import { VirtualNode as vnodevnode_VirtualNodejs } from "../vnode/vnode.js";
import { VirtualText as vnodevtext_VirtualTextjs } from "../vnode/vtext.js";
import { isVirtualNode as vnodeisvnode_isVirtualNodejs } from "../vnode/is-vnode";
import { isVirtualText as vnodeisvtext_isVirtualTextjs } from "../vnode/is-vtext";
import { isWidget as vnodeiswidget_isWidgetjs } from "../vnode/is-widget";
import { isHook as vnodeisvhook_isHookjs } from "../vnode/is-vhook";
import { isThunk as vnodeisthunk_isThunkjs } from "../vnode/is-thunk";
import { parseTag as parsetag_parseTagjs } from "./parse-tag.js";
import { SoftSetHook as hookssoftsethook_SoftSetHookjs } from "./hooks/soft-set-hook.js";
import { EvHook as hooksevhook_EvHookjs } from "./hooks/ev-hook.js";
'use strict';

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parsetag_parseTagjs(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !vnodeisvhook_isHookjs(props.value)
    ) {
        props.value = hookssoftsethook_SoftSetHookjs(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new vnodevnode_VirtualNodejs(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new vnodevtext_VirtualTextjs(c));
    } else if (typeof c === 'number') {
        childNodes.push(new vnodevtext_VirtualTextjs(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (ext_xisarray_isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (vnodeisvhook_isHookjs(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = hooksevhook_EvHookjs(value);
            }
        }
    }
}

function isChild(x) {
    return vnodeisvnode_isVirtualNodejs(x) || vnodeisvtext_isVirtualTextjs(x) || vnodeiswidget_isWidgetjs(x) || vnodeisthunk_isThunkjs(x);
}

function isChildren(x) {
    return typeof x === 'string' || ext_xisarray_isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}
export { index_h as h };
