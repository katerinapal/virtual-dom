var isvtext_isVirtualText = isVirtualText;
import { versionjs as version_versionjsjs } from "./version";

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version_versionjsjs;
}
export { isvtext_isVirtualText as isVirtualText };
