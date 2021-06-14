var mod_isVirtualNode = isVirtualNode;
import { versionjs as version } from "./version";

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version;
}
export { mod_isVirtualNode as isVirtualNode };
