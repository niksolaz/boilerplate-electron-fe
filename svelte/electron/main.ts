import { app, BrowserWindow } from 'electron';
import path from 'path';

console.log('main.ts')

app.disableHardwareAcceleration();

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the Svelte app
  if (process.env.NODE_ENV === 'development') {
    console.log('loading dev server')
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    console.log('loading index.html')
    win.loadFile(path.join(__dirname, '../dist/index.html'));
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});