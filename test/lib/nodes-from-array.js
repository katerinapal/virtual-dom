var mod_nodesFromArray = nodesFromArray;
import { h as h_h } from "../../h.js";

function nodesFromArray(array) {
    var i =0
    var children = []
    var key
    var properties

    for(; i < array.length; i++) {
        key = array[i]

        if (key != null) {
            properties = {
                key: key,
                id: String(key)
            }
        }
        else {
            properties = {
                id: 'no-key-' + i
            }
        }

        children.push(h_h('div', properties, properties.id))
    }

    return h_h('div', children);
}
export { mod_nodesFromArray as nodesFromArray };
