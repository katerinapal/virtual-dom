var mod_VirtualText = VirtualText;
import { versionjs as version } from "./version";

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"
export { mod_VirtualText as VirtualText };
