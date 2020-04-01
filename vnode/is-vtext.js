import { versionjs as version_versionjsjs } from "./version";

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version_versionjsjs;
}
var exported_isVirtualText = isVirtualText;
export { exported_isVirtualText as isVirtualText };
