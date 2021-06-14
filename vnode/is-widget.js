var mod_isWidget = isWidget;

function isWidget(w) {
    return w && w.type === "Widget"
}
export { mod_isWidget as isWidget };
