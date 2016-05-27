const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  Tray
} = require('electron');
const Settings = require('./src/js/Settings.js');

//modules
require('./src/js/AutoLaunch.js');
require('./src/js/CrashReporter.js');
require('./src/js/Menu.js');
require('./src/js/Tray.js');

//ICON from https://www.iconfinder.com/icons/45375/barbell_dumbbell_dumbell_fitness_gym_physical_weight_weightlifting_weights_icon

// keep a global reference of the window object, otherwise the window would
// be closed automatically when the JavaScript object is garbage collected
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    minWidth: 500,
    maxWidth: 500,
    height: 800,
    minHeight: 400
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.webContents.openDevTools();

  // the main window has been closed, dereference the window(s)
  mainWindow.on('closed', () => mainWindow = null);
}

// Electron has finished initialization and can create browser windows
app.on('ready', () => createWindow());

// quit when all windows are closed
app.on('window-all-closed', function() {
  // on OS X, stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

// on OS X, re-create the window if the dock icon is clicked (`activate` event)
// and no windows are open
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
});

//data loading & saving events
ipcMain
  .on('load-data', event => {
    Settings.load(settings => event.returnValue = settings);
  })
  .on('save-data', (event, settings) => {
    Settings.save(settings);
  });
