const {
  app,
  Menu,
  MenuItem
} = require('electron');

const name = app.getName();

//build a menu template
let template = [{
  label: 'File',
  submenu: [{
    label: `Give me a 30-minute break!`,
    click(event, focusedWindow) {
      focusedWindow.send('postpone', 1800000);
    }
  }, {
    type: 'separator'
  }, {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click() {
      app.quit();
    }
  }]
}];

//OS X specifics
if (process.platform === 'darwin') {
  template[0].label = name;
  template[0].submenu.splice(2, 0, {
    label: `About ${name}`,
    role: 'about'
  });
}

//mount the menu once the app is ready
app.on('ready', function() {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
