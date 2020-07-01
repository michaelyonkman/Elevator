import React from 'react';
import './App.css';

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
    this.setState({
      ['btn' + e.target.value + 'disabled']: true,
    });
    this.state.selected.push(Number(e.target.value));
    this.state.selected.sort((a, b) => {
      return a - b;
    });
    if (!this.state.direction) {
      if (Number(e.target.value) > this.state.floor) {
        this.setState({ direction: 'up', message: '▲' });
        for (let i = 1; i < this.state.floor; i++) {
          this.setState({
            ['btn' + String(i) + 'disabled']: true,
          });
        }
        intervalID = setInterval(() => {
          this.setState({
            floor: this.state.floor + 1,
            ['btn' + String(this.state.floor + 1) + 'disabled']: true,
          });
          if (this.state.floor === this.state.selected[0]) {
            this.arrived();
          }
        }, 1000);
      } else if (Number(e.target.value) < this.state.floor) {
        this.setState({ direction: 'down', message: '▼' });
        for (let i = 10; i > this.state.floor; i--) {
          this.setState({
            ['btn' + String(i) + 'disabled']: true,
          });
        }
        intervalID = setInterval(() => {
          this.setState({
            floor: this.state.floor - 1,
            ['btn' + String(this.state.floor - 1) + 'disabled']: true,
          });
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
    this.playAudio();
    clearInterval(intervalID);
    this.setState({ message: '◀︎▶' });
    setTimeout(() => {
      if (this.state.selected.length > 1) {
        if (this.state.direction === 'up') {
          this.setState({ message: '▲' });
          this.state.selected.shift();
          intervalID = setInterval(() => {
            this.setState({
              floor: this.state.floor + 1,
              ['btn' + String(this.state.floor + 1) + 'disabled']: true,
            });
            if (this.state.floor === this.state.selected[0]) {
              this.arrived();
            }
          }, 1000);
        } else if (this.state.direction === 'down') {
          this.setState({ message: '▼' });
          this.state.selected.pop();
          intervalID = setInterval(() => {
            this.setState({
              floor: this.state.floor - 1,
              ['btn' + String(this.state.floor - 1) + 'disabled']: true,
            });
            if (
              this.state.floor ===
              this.state.selected[this.state.selected.length - 1]
            ) {
              this.arrived();
            }
          }, 1000);
        }
      } else {
        this.state.selected.pop();
        this.reset();
      }
    }, 5000);
  }
  reset() {
    for (let i = 1; i <= 10; i++) {
      if (i === this.state.floor) {
        continue;
      }
      this.setState({
        ['btn' + String(i) + 'disabled']: false,
      });
    }
    this.setState({ direction: null });
  }
  playAudio() {
    const ding = document.getElementById('ding');
    ding.play();
  }
}

export default App;
