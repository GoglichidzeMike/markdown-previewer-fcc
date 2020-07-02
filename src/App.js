import React from "react";
import PadBank from "./components/PadBank";
import "./App.css";
import { bankOne, bankTwo } from "./components/buttons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: "Heater Kit",
      sliderVal: 0.3,
    };

    this.displayClipName = this.displayClipName.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.selectBank = this.selectBank.bind(this);
  }

  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name,
      });
    }
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160),
    });
  }
  selectBank() {
    if (this.state.power) {
      this.state.currentPadBankId === "Heater Kit"
        ? this.setState({
            currentPadBank: bankTwo,
            display: "Smooth Piano Kit",
            currentPadBankId: "Smooth Piano Kit",
          })
        : this.setState({
            currentPadBank: bankOne,
            display: "Heater Kit",
            currentPadBankId: "Heater Kit",
          });
    }
  }
  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100),
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }

  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160),
    });
  }

  render() {
    const powerSlider = this.state.power
      ? {
          float: "right",
        }
      : {
          float: "left",
        };
    const bankSlider =
      this.state.currentPadBank === bankOne
        ? {
            float: "left",
          }
        : {
            float: "right",
          };
    {
      const clips = [].slice.call(document.getElementsByClassName("clip"));
      clips.forEach((sound) => {
        sound.volume = this.state.sliderVal;
      });
    }

    return (
      <div id="drum-machine" className="inner-container">
        <PadBank
          power={this.state.power}
          currentPadBank={this.state.currentPadBank}
          updateDisplay={this.displayClipName}
          clipVolume={this.state.sliderVal}
        />

        <div className="logo">
          <div className="inner-logo ">{"FCC" + String.fromCharCode(160)}</div>
          <i className="inner-logo fa fa-free-code-camp" />
        </div>

        <div className="controls-container">
          <div className="control">
            <div onClick={this.powerControl} className="select">
              <div style={powerSlider} className="inner" />
            </div>
          </div>
          <p id="display">{this.state.display}</p>
          <div className="volume-slider">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={this.state.sliderVal}
              onChange={this.adjustVolume}
            />
          </div>
          <div className="control">
            <p>Bank</p>
            <div onClick={this.selectBank} className="select">
              <div style={bankSlider} className="inner" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
