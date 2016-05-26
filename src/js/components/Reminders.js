import React from 'react';
import Reminder from './Reminder.js';

/**
 * Collection of reminders.
 */

export default class Reminders extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    var reminders = this.props.reminders.map(reminder => {
      return <Reminder
        remaining={reminder.timer.remaining}
        delete={this.props.delete}
        key={reminder.challenge}
        data={reminder} />;
    });
    return <div className="reminders">
      {reminders}
    </div>;
  }
}
