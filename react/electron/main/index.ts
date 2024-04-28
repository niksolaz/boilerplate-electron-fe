import { app, BrowserWindow, shell, ipcMain, Notification } from 'electron';
import { join } from 'path';
import '../env';
import dotenv from 'dotenv';

import { IpcMainEndpoints } from './events/endpoints';

dotenv.config();

let pid = null

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')


const quitApp = (): void => {
  // before quit
  // window all closed
  console.log('Closed Window')
  win = null
  app.quit()
}

/**
 * Service Notification
 */
const MSG = {
  title: 'Boilerplate Electron React Vite',
  body: 'Application Connected',
  icon: ''
}

/**
 * Method Service Notification
 */
const showNotification = () => new Notification({ title: MSG.title, body: MSG.body, icon: MSG.icon }).show()

async function createWindow() {
  win = new BrowserWindow({
    title: 'Boilerplate Electron React Vite',
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
    },
  })


  win.setMinimumSize(1280, 800)

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // IpcMainEndpoints for IPCMAIN: call all ipcMain from preload with ffi
  IpcMainEndpoints()

  if (process.env.PLATFORM === "win32") {
    // Message notification for windows
    MSG.title = 'WIN32'
  } else {
    // Message notification for Unix
    MSG.title = 'UNIX'
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady()
  .then(createWindow)
  .then(showNotification)

app.once('ready', async () => {
  pid = process.pid
  console.log('#####[pid]', pid)
})

app.on('window-all-closed', () => {
  quitApp()
})


app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})