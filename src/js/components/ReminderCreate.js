import React from 'react';

/**
 * Create a reminder box.
 *
 * By default, the form is hidden and is shown only
 * on clicking the "Add a new task" heading.
 */

export default class ReminderCreate extends React.Component {
  constructor(props){
    super(props);
    this.resetState();
  }
  resetState(){
    this.state = {
      start: '',
      finish: '',
      challenge: '',
      repeat: 5
    };
  }
  handleAddClick(){
    if(this.isFormShown()){
      this.hideForm();
    }
    else{
      this.showForm();
    }
  }
  isFormShown(){
    return document.getElementById('reminderCreateForm').style.maxHeight === '350px';
  }
  showForm(){
    document.getElementById('reminderCreateForm').style.maxHeight = '350px';
  }
  hideForm(){
    document.getElementById('reminderCreateForm').style.maxHeight = '0px';
  }
  handleChallengeChange(e){
    this.setState({challenge: e.target.value});
  }
  handleStartChange(e){
    this.setState({start: e.target.value});
  }
  handleFinishChange(e){
    this.setState({finish: e.target.value});
  }
  handleRepeatChange(e){
    this.setState({repeat: e.target.value});
  }
  //submit the form
  handleSubmit(e){
    e.preventDefault();
    this.props.create(this.state);
    this.resetState();
    this.hideForm();
  }
  render() {
    return <div className="reminder-create">
      <h2 onClick={this.handleAddClick.bind(this)}>
        Add a new reminder
      </h2>
      <form
        onSubmit={this.handleSubmit.bind(this)}
        id="reminderCreateForm">
        <div className="form-group">
          <label for="reminderStart">Start:</label>
          <input
            id="reminderStart"
            type="time"
            value={this.state.start}
            onChange={this.handleStartChange.bind(this)}
            required />
        </div>
        <div className="form-group">
          <label for="reminderFinish">Finish:</label>
          <input
            id="reminderFinish"
            type="time"
            value={this.state.finish}
            onChange={this.handleFinishChange.bind(this)}
            required />
        </div>
        <div className="form-group">
          <label for="reminderRepeat">
            Repeat every (in minutes):
          </label>
          <input
            id="reminderRepeat"
            type="number"
            step="1"
            value={this.state.repeat}
            onChange={this.handleRepeatChange.bind(this)}
            required />
        </div>
        <div className="form-group">
          <label for="reminderChallenge">Task:</label>
          <input
            id="reminderChallenge"
            type="text"
            size="30"
            placeholder="Give yourself a challenge"
            value={this.state.challenge}
            onChange={this.handleChallengeChange.bind(this)}
            required
            />
        </div>
        <button
          className="button button-red"
          type="submit">
          Add to my reminders!
        </button>
      </form>
    </div>;
  }
}
