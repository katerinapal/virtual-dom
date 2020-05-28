var vtext_VirtualText = VirtualText;
import { versionjs as version_versionjsjs } from "./version";

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version_versionjsjs
VirtualText.prototype.type = "VirtualText"
export { vtext_VirtualText as VirtualText };
