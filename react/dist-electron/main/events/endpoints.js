"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
function IpcMainEndpoints() {
  var Welcome = function() {
    electron.ipcMain.on("api-welcome", function(event) {
      event.reply("api-welcome", "Welcome to the main process");
    });
  };
  return {
    Welcome
  };
}
exports.IpcMainEndpoints = IpcMainEndpoints;
//# sourceMappingURL=endpoints.js.map
