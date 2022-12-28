import React, { Component } from "react";
import "./App.scss";

const KEYS = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const KEYS_AUDIOS = [
  {
    key: "Q",
    song: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "W",
    song: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "E",
    song: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "A",
    song: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "S",
    song: "Heater-6",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "D",
    song: "Dsc_Oh",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    song: "Kick_n_Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    song: "RP4_KICK_1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    song: "Cev_H2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songText: "",
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleKeyPress(event) {
    const pad = KEYS_AUDIOS.find((item) => item.key == event.key.toUpperCase());
    if (pad) {
      document.getElementById(pad.key).click();
      this.setState({
        songText: pad.song,
      });
    }
  }
  handleClick(key, song) {
    return () => {
      document.getElementById(key).play();
      this.setState({
        songText: song,
      });
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    console.log(this.state.songText);
    return (
      <div id="App">
        <div id="drum-machine">
          <div id="drum-pads">
            {KEYS_AUDIOS.map((item) => (
              <Button
                key={item.key}
                drumKey={item.key}
                song={item.song}
                url={item.url}
                handleClick={this.handleClick}
              />
            ))}
          </div>
          <div id="display">
            <p>{this.state.songText} </p>
          </div>
        </div>
      </div>
    );
  }
}


class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        className="drum-pad"
        id={this.props.song}
        onClick={this.props.handleClick(this.props.drumKey, this.props.song)}
      >
        {this.props.drumKey}
        <audio
          className="clip"
          preload="true"
          src={this.props.url}
          id={this.props.drumKey}
        ></audio>
      </button>
    );
  }
}

export default App;
