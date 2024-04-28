"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
function IpcMainEndpoints() {
  const Welcome = () => {
    electron.ipcMain.on("api-welcome", (event) => {
      event.reply("api-welcome", "Welcome to the main process");
    });
  };
  return {
    Welcome
  };
}
exports.IpcMainEndpoints = IpcMainEndpoints;
//# sourceMappingURL=endpoints2.js.map
