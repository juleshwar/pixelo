import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/components/Palette.css";

export class PaletteBar extends Component {
    static propTypes = {
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    render() {
        const paletteList = this.props.colors.map((color) => {
            return (
                <div
                    key={color}
                    className="palette-item"
                    style={Object.assign({}, { background: color })}
                ></div>
            );
        });
        return <div className="palette-bar">{paletteList}</div>;
    }
}

export default PaletteBar;
