import React, { Component } from "react";

export class ColorCell extends Component {
  render() {
    const color = "black";
    return (
      <div
        className="h-16 w-16"
        style={Object.assign({}, { background: color })}
      ></div>
    );
  }
}

export default ColorCell;
