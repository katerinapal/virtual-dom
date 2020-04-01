import { versionjs as version_versionjsjs } from "./version";

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version_versionjsjs
VirtualText.prototype.type = "VirtualText"
var exported_VirtualText = VirtualText;
export { exported_VirtualText as VirtualText };
