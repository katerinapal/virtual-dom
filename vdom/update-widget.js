var mod_updateWidget = updateWidget;
import { isWidget as iswidget_isWidget } from "../vnode/is-widget.js";

function updateWidget(a, b) {
    if (iswidget_isWidget(a) && iswidget_isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}
export { mod_updateWidget as updateWidget };
