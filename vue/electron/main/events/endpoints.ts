import { ipcMain } from 'electron';


export function IpcMainEndpoints() {
  const Welcome = () => {
    ipcMain.on('api-welcome', (event) => {
      event.reply('api-welcome', 'Welcome to the main process')
    })
  }

  return {
    Welcome
  }
}