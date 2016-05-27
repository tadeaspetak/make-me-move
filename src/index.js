var React = require('react');
var ReactDom = require('react-dom');
const ipcRenderer = window.require('electron').ipcRenderer;
const dialog = window.require('electron').remote.dialog;

//require styles so that they end up in the `bundle.js`
require('./scss/fonts.scss');
require('./scss/screen.scss');
require('./assets/app-icon/weights-tiny.png');

//components
import ReminderCreate from './js/components/ReminderCreate.js';
import Reminders from './js/components/Reminders.js';

//schedule utility
import Schedule from './js/Schedule.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        reminders: []
      }
    };
  }
  componentWillMount() {
    //load the settings & start ticking
    let settings = ipcRenderer.sendSync('load-data');
    settings.reminders.forEach(reminder => reminder.schedule = new Schedule(reminder));
    this.tick(settings);

    //on postpone click
    ipcRenderer.on('postpone', (event, milliseconds) => {
      this.state.settings.reminders.forEach(reminder => reminder.schedule.postponeBy(milliseconds));
      this.handleRemindersUpdate();

      //show a notification
      var minutes = Math.floor(milliseconds / 60000);
      new Notification(this.state.settings.postpone.heading.replace('${minutes}', minutes), {
        body: this.state.settings.postpone.body.replace('${minutes}', minutes)
      });
    });
  }
  handleRemindersUpdate(settings) {
    settings = settings || this.state.settings;
    if (settings.reminders) {
      settings.reminders = settings.reminders.sort((a, b) => {
        return a.schedule.remaining > b.schedule.remaining;
      });
    }
    this.setState({settings: settings});
  }
  /**
  * Tick.
  */
  tick(settings) {
    settings = settings || this.state.settings;
    settings.reminders.forEach(reminder => {
      let remaining = reminder.schedule.computeRemaining();
      if(remaining <= 0){
        new Notification(reminder.challenge, {
          body: this.state.settings.comment.replace('${minutes}', reminder.repeat)
        });
        reminder.schedule.reset();
      } else {
        reminder.schedule.remaining = remaining;
      }
    });
    this.handleRemindersUpdate(settings);

    //schedule the next tick
    let next = 1000 - new Date().getTime() % 1000;
    this.timeout = setTimeout(this.tick.bind(this), next === 0 ? 1000 : next);
  }
  /**
  * Create a new reminder.
  */
  createReminder(reminder) {
    reminder.schedule = new Schedule(reminder);
    this.state.settings.reminders.push(reminder);
    this.handleRemindersUpdate();

    //save the settings
    ipcRenderer.send('save-data', this.state.settings);
  }
  /**
  * Delete a reminder after asking for user confirmation.
  */
  deleteReminder(reminder) {
    dialog.showMessageBox({
      buttons: [this.state.settings.delete.confirm, this.state.settings.delete.cancel],
      message: this.state.settings.delete.message.replace('${challenge}', reminder.challenge)
    }, response => {
      if (response === 0) {
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
