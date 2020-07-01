import React from 'react';
import './App.css';

//keeping track of intervalID for setInterval function globally
let intervalID;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      floor: 1,
      selected: [],
      message: '◀︎▶︎',
      direction: null,
      btn1disabled: true,
      btn2disabled: false,
      btn3disabled: false,
      btn4disabled: false,
      btn5disabled: false,
      btn6disabled: false,
      btn7disabled: false,
      btn8disabled: false,
      btn9disabled: false,
      btn10disabled: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.arrived = this.arrived.bind(this);
    this.reset = this.reset.bind(this);
    this.playAudio = this.playAudio.bind(this);
  }
  render() {
    return (
      <div className="App">
        <audio id="ding">
          <source src="https://www.freesoundslibrary.com/wp-content/uploads/2019/03/elevator-ding-sound.mp3"></source>
        </audio>
        <div className="message-floor-container">
          <div className="message-container">
            <h1>{this.state.message}</h1>
          </div>
          <div className="floor-container">
            <h1>{this.state.floor}</h1>
          </div>
        </div>

        <div className="button-container">
          <div className="button-container-left">
            <button
              className={this.state.selected.includes(1) ? 'selected' : null}
              value="1"
              disabled={this.state.btn1disabled}
              onClick={this.handleClick}
            >
              1
            </button>
            <button
              className={this.state.selected.includes(3) ? 'selected' : null}
              value="3"
              disabled={this.state.btn3disabled}
              onClick={this.handleClick}
            >
              3
            </button>
            <button
              className={this.state.selected.includes(5) ? 'selected' : null}
              value="5"
              disabled={this.state.btn5disabled}
              onClick={this.handleClick}
            >
              5
            </button>
            <button
              className={this.state.selected.includes(7) ? 'selected' : null}
              value="7"
              disabled={this.state.btn7disabled}
              onClick={this.handleClick}
            >
              7
            </button>
            <button
              className={this.state.selected.includes(9) ? 'selected' : null}
              value="9"
              disabled={this.state.btn9disabled}
              onClick={this.handleClick}
            >
              9
            </button>
          </div>
          <div className="button-container-right">
            <button
              className={this.state.selected.includes(2) ? 'selected' : null}
              value="2"
              disabled={this.state.btn2disabled}
              onClick={this.handleClick}
            >
              2
            </button>
            <button
              className={this.state.selected.includes(4) ? 'selected' : null}
              value="4"
              disabled={this.state.btn4disabled}
              onClick={this.handleClick}
            >
              4
            </button>
            <button
              className={this.state.selected.includes(6) ? 'selected' : null}
              value="6"
              disabled={this.state.btn6disabled}
              onClick={this.handleClick}
            >
              6
            </button>
            <button
              className={this.state.selected.includes(8) ? 'selected' : null}
              value="8"
              disabled={this.state.btn8disabled}
              onClick={this.handleClick}
            >
              8
            </button>
            <button
              className={this.state.selected.includes(10) ? 'selected' : null}
              value="10"
              disabled={this.state.btn10disabled}
              onClick={this.handleClick}
            >
              10
            </button>
          </div>
        </div>
      </div>
    );
  }
  handleClick(e) {
    //disables clicked button
    this.setState({
      ['btn' + e.target.value + 'disabled']: true,
    });
    //adds floor number to selected floors array
    this.state.selected.push(Number(e.target.value));
    //sort selected floors array
    this.state.selected.sort((a, b) => {
      return a - b;
    });
    if (!this.state.direction) {
      //logic to determine which direction the elevator will be going (up)
      if (Number(e.target.value) > this.state.floor) {
        this.setState({ direction: 'up', message: '▲' });
        //looping through and disabling buttons for all floors less than current floor to prevent users from adding invalid inputs
        for (let i = 1; i < this.state.floor; i++) {
          this.setState({
            ['btn' + String(i) + 'disabled']: true,
          });
        }
        //setInterval for moving up 1 floor per second
        intervalID = setInterval(() => {
          this.setState({
            //disabling buttons as elevator ascends to keep users from adding invalid inputs
            floor: this.state.floor + 1,
            ['btn' + String(this.state.floor + 1) + 'disabled']: true,
          });
          //if floor is in first position in selected floors array it's the first destination going up and calling arrived function
          if (this.state.floor === this.state.selected[0]) {
            this.arrived();
          }
        }, 1000);
        //logic to determine elevator is going down
      } else if (Number(e.target.value) < this.state.floor) {
        this.setState({ direction: 'down', message: '▼' });
        //looping through and disabling buttons for all floors greater than current floor to prevent users from adding invalid inputs
        for (let i = 10; i > this.state.floor; i--) {
          this.setState({
            ['btn' + String(i) + 'disabled']: true,
          });
        }
        //setInterval to move down 1 floor per second
        intervalID = setInterval(() => {
          this.setState({
            floor: this.state.floor - 1,
            ['btn' + String(this.state.floor - 1) + 'disabled']: true,
          });
          //if floor is in last position in selected floors array it's the first destination going down and calling arrived function
          if (
            this.state.floor ===
            this.state.selected[this.state.selected.length - 1]
          ) {
            this.arrived();
          }
        }, 1000);
      }
    }
  }
  arrived() {
    //play elevator bell audio clip on arrival
    this.playAudio();
    //clearInterval to stop timer
    clearInterval(intervalID);
    this.setState({ message: '◀︎▶' });
    //setTimeout for 5 sec pause at destination
    setTimeout(() => {
      //checking if selected floors array has more destinations to go
      if (this.state.selected.length > 1) {
        //if so, determine direction again (up)
        if (this.state.direction === 'up') {
          this.setState({ message: '▲' });
          this.state.selected.shift();
          //setting 1 sec interval again
          intervalID = setInterval(() => {
            this.setState({
              //disabling buttons again
              floor: this.state.floor + 1,
              ['btn' + String(this.state.floor + 1) + 'disabled']: true,
            });
            //calling arrived if at destination
            if (this.state.floor === this.state.selected[0]) {
              //calling arrived recursively until all destinations have been reached
              this.arrived();
            }
          }, 1000);
          //determines direction is down
        } else if (this.state.direction === 'down') {
          this.setState({ message: '▼' });
          this.state.selected.pop();
          //setting 1 sec interval again
          intervalID = setInterval(() => {
            this.setState({
              //disabling buttons again
              floor: this.state.floor - 1,
              ['btn' + String(this.state.floor - 1) + 'disabled']: true,
            });
            if (
              //calling arrived at destination
              this.state.floor ===
              this.state.selected[this.state.selected.length - 1]
            ) {
              //calling arrived recursively until all destinations have been reached
              this.arrived();
            }
          }, 1000);
        }
      } else {
        this.state.selected.pop();
        //if selected floors array is empty, enablind all buttons except current floor for next ride
        this.reset();
      }
    }, 5000);
  }
  reset() {
    //enabling buttons between rides
    for (let i = 1; i <= 10; i++) {
      if (i === this.state.floor) {
        continue;
      }
      this.setState({
        ['btn' + String(i) + 'disabled']: false,
      });
    }
    //setting direction back to null when ride's over
    this.setState({ direction: null });
  }
  playAudio() {
    //function to play audio
    const ding = document.getElementById('ding');
    ding.play();
  }
}

export default App;
