import React, { Component } from "react";

import "./modal.css";

export default class Modal extends Component {
  render() {
    return (
      <div className="backgroundAbsoltute" onClick={this.props.handleClick}>
        <div className="modalContainer">
          <div className="modalText">{this.props.text}</div>
          <button onClick={this.props.handleClick} className="modalButton">
            Acept
          </button>
        </div>
      </div>
    );
  }
}
