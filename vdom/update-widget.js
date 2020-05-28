var updatewidget_updateWidget = updateWidget;

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
export { updatewidget_updateWidget as updateWidget };
