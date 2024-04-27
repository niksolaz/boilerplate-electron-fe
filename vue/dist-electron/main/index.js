"use strict";
const electron = require("electron");
const path = require("path");
const os = require("os");
const dotenv = require("dotenv");
process.env.DIST_ELECTRON = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
process.env.TYPE = os.type();
process.env.TEMP_DIR = os.tmpdir();
process.env.PLATFORM = os.platform();
dotenv.config();
let pid = null;
let win = null;
const preload = path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = path.join(process.env.DIST, "index.html");
const quitApp = () => {
  console.log("Closed Window");
  win = null;
  electron.app.quit();
};
let MSG = {
  title: "Daily Planner",
  body: "Application Connected",
  icon: ""
};
const showNotification = () => new electron.Notification({ title: MSG.title, body: MSG.body, icon: MSG.icon }).show();
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Daily Planner Main",
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.setMinimumSize(1280, 800);
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
  if (process.env.PLATFORM === "win32") {
    MSG.title = "WIN32";
  } else {
    MSG.title = "UNIX";
  }
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
}
electron.app.whenReady().then(createWindow).then(showNotification);
electron.app.once("ready", async () => {
  pid = process.pid;
  console.log("#####[pid]", pid);
});
electron.app.on("window-all-closed", () => {
  quitApp();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new electron.BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
//# sourceMappingURL=index.js.map
