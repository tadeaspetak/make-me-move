/**
 * Simple timing utility.
 */

export default class Timer {
  /**
   * Create a timer for the given reminder.
   * @param  {object}     reminder  Reminder object to create a timer for.
   * @param  {function}   progress  Progress callback executed every tick (every second now).
   * @param  {function}   done      Callback executed when the timer finishes.
   */
  constructor(reminder, progress, done) {
      this.reminder = reminder;
      this.remaining = this.getRemaining();
      this.interval = setInterval(() => {
        this.remaining--;
        if (this.remaining <= 0) {
          this.stop();
          done();
        } else {
          progress(this.remaining);
        }
      },
      1000);
  }
  /**
   * Stop this timer.
   */
  stop() {
    clearInterval(this.interval);
    this.remaining = 0;
  }
  postpone(by){
    this.remaining = this.computeRemaining(by);
  }
  /**
   * Get the time before this timer finishes.
   */
  getRemaining() {
    return this.remaining ? this.remaining : this.computeRemaining();
  }
  computeRemaining(postponeBy){
    postponeBy = postponeBy || 0;
    let now = new Date();

    //reminder start
    let start = new Date();
    let [startHours, startMinutes] = this.reminder.start.split(':');
    start.setHours(startHours);
    start.setMinutes(startMinutes);
    start.setSeconds(0);

    //reminder finish
    let [finishHours, finishMinutes] = this.reminder.finish.split(':');
    let finish = new Date();
    finish.setHours(finishHours);
    finish.setMinutes(finishMinutes);
    finish.setSeconds(0);

    var difference = (now.getTime() - start.getTime()) / 1000;
    //it is outside of the time window for this reminder, let's wait till tomorrow
    if (finish.getTime() < (now.getTime() + postponeBy)) {
      return 24 * 60 * 60 - difference;
    }
    //this reminder should be run regularly in this period
    else {
      let repeat = parseInt(this.reminder.repeat) * 60;
      return repeat - difference % repeat + postponeBy;
    }
  }
}
