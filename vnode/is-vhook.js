"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isHook(hook) {
  return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
}
var exported_isHook = isHook;
exports.isHook = exported_isHook;
