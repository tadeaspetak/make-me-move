var jsonfile = require('jsonfile');
jsonfile.spaces = 2;

/**
 * Class responsible for loading & saving settings.
 */

class Settings {
  /**
   * Load the settings.
   */
  static load(callback) {
      jsonfile.readFile(Settings.path, (error, settings) => {
        if (error) {
          jsonfile.readFile(`${__dirname}/../../settings.default.json`, (error, settings) => {
            jsonfile.writeFile(Settings.path, settings, error => callback(settings));
          });
        } else {
          callback(settings);
        }
      });
    }
  /**
   * Save the settings.
   */
  static save(settings, callback) {
      //the schedules should not be saved!
      if(settings.reminders){
        settings = JSON.parse(JSON.stringify(settings));
        settings.reminders.forEach(reminder => delete reminder.schedule);
      }

      jsonfile.writeFile(Settings.path, settings, error => {
        if (callback) callback(error);
      });
    }
}
//place the settings into `~/.makememove.json` on MAC and `${appFolder}/settings.json`
Settings.path = process.platform === 'win32' && process.env.ENVIRONMENT !== 'DEV' ? `${process.cwd()}/settings.json` : `${process.env['HOME']}/.makememove.json`;

module.exports = Settings;
