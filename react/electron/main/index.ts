// electron/main/index.ts
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

// Funzione per creare la finestra principale dell'applicazione
function createMainWindow() {
  // Crea una finestra del browser
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Abilita l'integrazione Node.js
      contextIsolation: false, // Disabilita l'isolamento del contesto
      preload: path.join(__dirname, '../preload/index.js'), // Percorso del preload script
    },
  });

  // Carica l'URL dell'applicazione React
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '../../build/index.html'), // Percorso del file index.html generato da Vite
      protocol: 'file:',
      slashes: true,
    })
  );

  // Apri il pannello degli strumenti di sviluppo
  mainWindow.webContents.openDevTools();

  // Gestisci l'evento di chiusura della finestra
  mainWindow.on('closed', () => {
    app.quit();
  });
}

// Gestisci l'evento di inizializzazione dell'applicazione
app.on('ready', createMainWindow);

// Esci quando tutte le finestre sono state chiuse
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Ricrea la finestra principale quando l'app viene riattivata dopo essere stata in background
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
