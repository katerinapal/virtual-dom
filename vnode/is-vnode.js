var isvnode_isVirtualNode = isVirtualNode;
import { versionjs as version_versionjsjs } from "./version";

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version_versionjsjs;
}
export { isvnode_isVirtualNode as isVirtualNode };
