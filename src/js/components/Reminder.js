import React from 'react';

/**
* Single reminder.
*
* Displays the challenge, summarized settings (start, finish, repeat period),
* when the reminder is scheduled to run and a delete button.
*/

export default class Reminder extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return <div className="reminder">
      <div className="reminder-challenge">
        {this.props.data.challenge}
      </div>
      <div className="reminder-info">
          Repeat every <strong>{this.props.data.repeat}</strong> minutes,
          starting at <strong>{this.props.data.start}</strong>,
          ending at <strong>{this.props.data.finish}</strong>.
        </div>
        <div className="reminder-schedule">
          (Scheduled to run in <strong>{this.formatTime(this.props.remaining)}</strong>...)
    </div>
      <span
        className="reminder-delete"
        onClick={() => this.props.delete(this.props.data)}>x</span>
    </div>;
  }
  /**
   * Format time in milliseconds into a human-friendly `hh:mm:ss`.
   */
  formatTime(remaining){
    remaining = Math.ceil(remaining / 1000);

    function format(value, previous, following){
      value = previous ? (value < 10 ? `0${value}` : value) : (value === 0 ? '' : value);
      return following ? (value !== '' ? `${value}:` : '') : value;
    }

    let hours = Math.floor(remaining / 3600);
    let minutes = Math.floor((remaining - hours * 3600) / 60);
    let seconds = Math.floor(remaining % 60);
    return format(hours, false, true) + format(minutes, true, true) + format(seconds, true, false);
  }
}
