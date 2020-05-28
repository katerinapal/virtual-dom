"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isvhook_isHook = isHook;

function isHook(hook) {
  return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
}
exports.isHook = isvhook_isHook;