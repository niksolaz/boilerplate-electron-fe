import { ipcMain } from 'electron';
export function IpcMainEndpoints() {
    var Welcome = function () {
        ipcMain.on('api-welcome', function (event) {
            event.reply('api-welcome', 'Welcome to the main process');
        });
    };
    return {
        Welcome: Welcome
    };
}
