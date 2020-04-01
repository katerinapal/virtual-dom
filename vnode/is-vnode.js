import { versionjs as version_versionjsjs } from "./version";

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version_versionjsjs;
}
var exported_isVirtualNode = isVirtualNode;
export { exported_isVirtualNode as isVirtualNode };
