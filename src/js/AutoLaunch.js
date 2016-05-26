const AutoLaunch = require('auto-launch');

/**
 * Add the app to auto-launch.
 */

var autolaunch = new AutoLaunch({
  name: 'Make Me Move'
    //isHidden: true // hidden on launch - only works on a mac atm.
});

if (process.env.ENVIRONMENT !== 'DEV') {
  autolaunch.enable();
}
