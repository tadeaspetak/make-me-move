/**
 * Simple scheduling utility.
 */

export default class Schedule {
  /**
   * Create a schedule for the given reminder. The ticking
   * is handled from the app itself (actions down).
   *
   * @param  {object}     reminder  Reminder object to create a schedule for.
   */
  constructor(reminder) {
    this.reminder = reminder;
    this.showAt = this.computeShowAt();
    this.remaining = this.computeRemaining();
  }
  /**
   * Reset the schedule (used when the reminder has been shown).
   */
  reset(postponeBy){
    this.showAt = this.computeShowAt(postponeBy);
    this.remaining = this.computeRemaining();
  }
  /**
   * Postpone this schedule by the given amount of milliseconds.
   */
  postponeBy(milliseconds) {
    this.reset(milliseconds);
  }
  /**
   * Calculate how much is remiaining till the reminder is to be shown.
   */
  computeRemaining() {
    return this.showAt - new Date().getTime();
  }
  /**
   * Calculate when the reminder should be shown.
   */
  computeShowAt(postponeBy) {
    postponeBy = postponeBy || 0;

    let start = this.getTime(this.reminder.start);
    let finish = this.getTime(this.reminder.finish);
    let now = new Date().getTime();

    let repeat = parseInt(this.reminder.repeat) * 60000;
    if(finish < now + postponeBy){
      let tomorrow = start + 86400000;
      return Math.max(tomorrow, tomorrow + Math.ceil((finish + postponeBy - tomorrow) / repeat) * repeat);
    } else {
      let earliest = now + postponeBy;
      return start + Math.ceil((earliest - start) / repeat) * repeat;
    }
  }
  /**
   * Get time for today from `hh:mm`.
   */
  getTime(input){
    let [hours, minutes] = input.split(':');
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  }
}
