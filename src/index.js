import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import './index.css';

class Timer extends React.Component {
  state = {
    originalTime: new Date(),
    updatedTime: new Date(),
    timeSaved: 0,
    timerStarted: false,
    timerStopped: true, 
    timerPaused: false,
  };

  constructor(props) {
    super(props);
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handleStopTimer = this.handleStopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handleResetTimer = this.handleResetTimer.bind(this);
  }

  handleStartTimer() {
    if (this.state.timerStarted === false) {
      this.setState({
        originalTime: new Date(),
        updatedTime: new Date(),
        timerStarted: true,
        timerStopped: false,
        timerPaused: false,
      }, () => {
        this.startTimer();
      });
    }
  }

  handleStopTimer() {
    if (this.state.timerStarted === true && this.state.timerStopped === false) {
      let timeElapsed = this.state.updatedTime - this.state.originalTime;
      this.setState({
        timerStarted: false,
        timerStopped: true,
        timerPaused: true,
        timeSaved: timeElapsed + this.state.timeSaved, 
      });
    }
  }

  handleResetTimer() {
    this.setState({
      originalTime: new Date(),
      updatedTime: new Date(),
      timeSaved: 0,
      timerStarted: false,
      timerStopped: true,
      timerPaused: false,
    });
  }

  startTimer() {
    this.setState({
      updatedTime: new Date(),
    });
    if (!this.state.timerStopped)
      setTimeout(this.startTimer, 10);
  }

  getMilliseconds(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    return (milliseconds < 10) ? '0' + milliseconds : milliseconds.toString();
  }

  getSeconds(time) {
    let seconds = Math.floor((time % (3600000 + 60000)) / 1000);
    return (seconds < 10) ? '0' + seconds : seconds.toString();
  }

  getMinutes(time) {
    let minutes = Math.floor((time % 3600000) / 60000);
    return (minutes < 10) ? '0' + minutes : minutes.toString();
  }

  getHours(time) {
    let hours = Math.floor(time / 3600000);
    return (hours < 10) ? '0' + hours : hours.toString();
  }

  render() {
    let time;
    if (this.state.timerStopped == true) 
      time = this.state.timeSaved;
    else
      time = this.state.updatedTime - this.state.originalTime + this.state.timeSaved;

    const milliseconds = this.getMilliseconds(time);
    const seconds = this.getSeconds(time);
    const minutes = this.getMinutes(time);
    const hours = this.getHours(time);

    return(
      <div>
        <div className="timer-heading">
          <h2>TIMER</h2>
        </div>
        <div className="timer-container">
          <div className="timer-face">
            <p> {hours} : {minutes} : {seconds}.{milliseconds}</p>
          </div>
          <div className="buttons-container">
            <div className="start-stop-button">
              {
                (this.state.timerStarted == false)
                ? <Button variant="outline-secondary" className="start-button" 
                          onClick={this.handleStartTimer}><strong>Start</strong></Button>
                : <Button variant="outline-secondary" className="stop-button" 
                        onClick={this.handleStopTimer}><strong>Stop</strong></Button>
              }
            </div>
          </div>
          <div className="reset-container">
          <Button variant="outline-danger" className="reset-button" 
                        onClick={this.handleResetTimer}><strong>Reset</strong></Button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Timer />, document.getElementById('root'));
