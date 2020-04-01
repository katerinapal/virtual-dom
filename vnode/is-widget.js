function isWidget(w) {
    return w && w.type === "Widget"
}
var exported_isWidget = isWidget;
export { exported_isWidget as isWidget };
