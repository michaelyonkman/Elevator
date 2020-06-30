import React from 'react';
import './App.css';

let intervalID;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      floor: 1,
      selected: [],
      direction: null,
      message: '',
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
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <h1>{this.state.floor}</h1>
        <div>
          <button
            value="1"
            disabled={this.state.btn1disabled}
            onClick={this.handleClick}
          >
            1
          </button>
          <button
            value="2"
            disabled={this.state.btn2disabled}
            onClick={this.handleClick}
          >
            2
          </button>
          <button
            value="3"
            disabled={this.state.btn3disabled}
            onClick={this.handleClick}
          >
            3
          </button>
          <button
            value="4"
            disabled={this.state.btn4disabled}
            onClick={this.handleClick}
          >
            4
          </button>
          <button
            value="5"
            disabled={this.state.btn5disabled}
            onClick={this.handleClick}
          >
            5
          </button>
          <button
            value="6"
            disabled={this.state.btn6disabled}
            onClick={this.handleClick}
          >
            6
          </button>
          <button
            value="7"
            disabled={this.state.btn7disabled}
            onClick={this.handleClick}
          >
            7
          </button>
          <button
            value="8"
            disabled={this.state.btn8disabled}
            onClick={this.handleClick}
          >
            8
          </button>
          <button
            value="9"
            disabled={this.state.btn9disabled}
            onClick={this.handleClick}
          >
            9
          </button>
          <button
            value="10"
            disabled={this.state.btn10disabled}
            onClick={this.handleClick}
          >
            10
          </button>
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
        this.setState({ direction: 'up' });
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
        this.setState({ direction: 'down' });
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
    clearInterval(intervalID);
    this.setState({ message: 'Doors Opening' });
    setTimeout(() => {
      this.setState({ message: 'Doors Closing' });
      if (this.state.selected.length > 1) {
        if (this.state.direction === 'up') {
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
        console.log('DONE!!!', this.state.selected);
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
}

export default App;
