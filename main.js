const electron = require('electron');
const {app, BrowserWindow} = electron;

let mainWindow;

function createWindow() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({width: width, height: height });
  mainWindow.loadURL('file://' + __dirname + '/browser.html');
  mainWindow.on("closed", () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
      createWindow();
  }
});
