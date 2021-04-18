import React, { Component } from "react";
import {
  DRAWING_0,
  DRAWING_3,
} from "../constants/components/DrawingPanelConstants";
import PropTypes from "prop-types";
import DrawingPanel from "./DrawingPanel";
import PaletteBar from "./PaletteBar";
import { COLOR_PALETTE } from "../constants/components/PaletteBar";

export class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMeta: DRAWING_0,
    };
    this.onUpdateColor = this.onUpdateColor.bind(this);
  }

  static propTypes = {
    selectedColor: PropTypes.string,
  };

  static defaultProps = {
    selectedColor: "#FF00FF",
  };

  onUpdateColor(colorIndex) {
    const modifiedMeta = JSON.parse(JSON.stringify(this.state.currentMeta));
    modifiedMeta[colorIndex] = this.props.selectedColor;
    this.setState({ currentMeta: modifiedMeta });
  }

  render() {
    return (
      <div className="flex-column">
        <PaletteBar colors={COLOR_PALETTE} />
        <section className="flex">
          <DrawingPanel
            drawingMeta={DRAWING_3}
            onUpdateCellColor={this.onUpdateColor}
          />
          <DrawingPanel
            drawingMeta={this.state.currentMeta}
            onUpdateCellColor={this.onUpdateColor}
            isReadOnly={false}
          />
        </section>
      </div>
    );
  }
}

export default GameView;
