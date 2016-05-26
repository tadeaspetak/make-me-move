var React = require('react');
var ReactDom = require('react-dom');
const ipcRenderer = window.require('electron').ipcRenderer;
const dialog = window.require('electron').remote.dialog;

//require styles so that they end up in the `bundle.js`
require('./scss/fonts.scss');
require('./scss/screen.scss');
require('./assets/app-icon/weights-tiny.png');
//require('./js/main/menu.js');

//components
import ReminderCreate from './js/components/ReminderCreate.js';
import Reminders from './js/components/Reminders.js';

//timer utility
import Timer from './js/Timer.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        reminders: []
      }
    };
  }
  componentWillMount(){
    //load the settings
    var settings = ipcRenderer.sendSync('load-data');
    settings.reminders.forEach(reminder => this.scheduleReminder(reminder));

    this.handleRemindersUpdate(settings);

    ipcRenderer.on('postpone', (event, seconds) => {
      this.state.settings.reminders.forEach(reminder => reminder.timer.postpone(seconds));
      this.handleRemindersUpdate();

      //show a notification
      var minutes = Math.floor(seconds / 60);
      new Notification(this.state.settings.postpone.heading.replace('${minutes}', minutes), {
        body: this.state.settings.postpone.body.replace('${minutes}', minutes)
      });
    });
  }
  handleRemindersUpdate(settings){
    settings = settings || this.state.settings;
    if(settings.reminders){
      settings.reminders = settings.reminders.sort((a, b) => {
        return a.timer.remaining > b.timer.remaining;
      });
    }
    this.setState({settings: settings});
  }
  /**
   * Schedule a reminder.
   *
   * Create a `Timer` object for the given reminder
   * and save it into the reminder's `timer` property.
   */
  scheduleReminder(reminder){
    var self = this;
    reminder.timer = new Timer(
      reminder,
      () => this.setState({settings: this.state.settings}),
      () => {
        //show the notification
        new Notification(reminder.challenge, {
          body: this.state.settings.comment.replace('${minutes}', reminder.repeat),
          requireInteraction: true
        });
        self.scheduleReminder(reminder);
      });

    this.handleRemindersUpdate();
  }
  /**
   * Create a new reminder.
   */
  createReminder(reminder){
    this.scheduleReminder(reminder);
    this.state.settings.reminders.push(reminder);
    this.handleRemindersUpdate();

    //save the settings
    ipcRenderer.send('save-data', this.state.settings);
  }
  /**
   * Delete a reminder after asking for user confirmation.
   */
  deleteReminder(reminder){
    dialog.showMessageBox({
      buttons: [this.state.settings.delete.confirm, this.state.settings.delete.cancel],
      message: this.state.settings.delete.message.replace('${challenge}', reminder.challenge)
    },response => {
      if(response === 0){
        //don't forget to stop the timer!
        reminder.timer.stop();
        this.state.settings.reminders.splice(this.state.settings.reminders.indexOf(reminder), 1);
        this.setState({settings: this.state.settings});
        ipcRenderer.send('save-data', this.state.settings);
      }
    });
  }
  render() {
    return <div>
      <h1>
        <span className="icon"/>
        Make Me Move!
      </h1>
      <ReminderCreate create={this.createReminder.bind(this)}/>
      <Reminders
        reminders={this.state.settings.reminders}
        delete={this.deleteReminder.bind(this)}/>
    </div>;
  }
};

//render the app!
ReactDom.render(
  <App/>,
  document.getElementById('react-root')
);
