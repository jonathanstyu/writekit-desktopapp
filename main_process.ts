const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const ipcMain = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Let the app be accessed globally
global.app = app;

async function boot() {
  try {

    createWindow()
  } catch(e) {
    console.log(e);
  }
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1200, height: 700})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './source/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', boot)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
  // clearSettings();
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    boot()
  }
})

app.on('will-quit', function () {
  // globalShortcut.unregisterAll()
})

process.on('uncaughtException', function (error) {
  console.log(error);
})


// For detecting a dev environment
function isDev() {
  return process.mainModule.filename.indexOf('app.asar') === -1;
}



