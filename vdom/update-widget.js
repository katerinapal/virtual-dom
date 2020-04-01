import { isWidget as vnodeiswidget_isWidgetjs } from "../vnode/is-widget.js";

function updateWidget(a, b) {
    if (vnodeiswidget_isWidgetjs(a) && vnodeiswidget_isWidgetjs(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}
var exported_updateWidget = updateWidget;
export { exported_updateWidget as updateWidget };
