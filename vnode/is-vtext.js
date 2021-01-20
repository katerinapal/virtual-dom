var mod_isVirtualText = isVirtualText;
import { versionjs as version } from "./version";

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version;
}
export { mod_isVirtualText as isVirtualText };
