import { h as h_hjs } from "../../h.js";

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

        children.push(h_hjs('div', properties, properties.id))
    }

    return h_hjs('div', children);
}
var exported_nodesFromArray = nodesFromArray;
export { exported_nodesFromArray as nodesFromArray };
