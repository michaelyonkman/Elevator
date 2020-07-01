import React from 'react';
import './App.css';

let intervalID;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      floor: 1,
      selected: [],
      message: '⍇⍈',
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
          <source src="https://www.soundsnap.com/streamers/play.php?id=1593566209.8402:6bea42819f57baa1272b32325b3e3cbeecabe02a:a1a58cb466f7814b606e1d6aea62024f1da2ba98d7c6f1229a226b7334d087f138e1fb8cf0191c8ede7f6637f41f3702d1e24d4801f7439b022ff6b46d5f7dfce05101f99a4ca2d61c597d49d2eddb6fcdc6a9642886c7509ec2e4ecffc6485c8d82c8a604c78c415cf289a505b2a5ac2b4982320fd362e9a57345ec47c0121b83fcb34c3a354fb2fe32382ea82393c1de85f4fa017a721f55322a40482bb4755d2be1bd3fc32b68f70b7a096f52cd2afd0bfe992b675828f4c0731d2a682e09b55f0a84c5fd86047ce82eb2107af5ec7c9098cd3ef3b4fec390bb6c03524f43ffc430588137b59224dbbbf93685ea6fac1fd9deb2d6dd09af2713b977d8f35688c4ecb06ab72f8aa8f524f012b36168a8036ff77a4feb5c7c533afb71a2b44fbbb443aee44ca906afeea7a88673a6b1"></source>
        </audio>
        <div className="message">
          <h1>{this.state.message}</h1>
        </div>
        <div className="floor">
          <h1>{this.state.floor}</h1>
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
        this.setState({ direction: 'up', message: '↑' });
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
        this.setState({ direction: 'down', message: '↓' });
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
    this.setState({ message: '⍇⍈' });
    setTimeout(() => {
      if (this.state.selected.length > 1) {
        if (this.state.direction === 'up') {
          this.setState({ message: '↑' });
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
          this.setState({ message: '↓' });
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
