const {
  app,
  ipcMain,
  Menu,
  nativeImage,
  Tray
} = require('electron');
const Settings = require('./Settings.js');


app.on('ready', () => {
  Settings.load(settings => {
    const contextMenu = Menu.buildFromTemplate([{
      label: settings.postpone.button,
      type: 'normal',
      click: (event, focusedWindow) => {
        focusedWindow.send('postpone', 1800);
      }
    }]);
    //TODO: the icon is NOT found when ASAR packaging is used!
    tray = new Tray(__dirname + '/../assets/app-icon/weights-tiny.png');
    tray.setToolTip('Make Me Move!');
    tray.setContextMenu(contextMenu);
  });
});
