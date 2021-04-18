import React, { Component } from "react";
import "../styles/components/ColorCell.css";

export class ColorCell extends Component {
    render() {
        const color = "black";
        return (
            <div
                className="color-cell"
                style={Object.assign({}, { background: color })}
            ></div>
        );
    }
}

export default ColorCell;
