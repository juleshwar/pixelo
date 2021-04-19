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
    this.doUpdateDrawingMeta = this.doUpdateDrawingMeta.bind(this);
  }

  doUpdateDrawingMeta(colorIndex) {
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
            doUpdateCellColor={this.doUpdateDrawingMeta}
          />
          <DrawingPanel
            drawingMeta={this.state.currentMeta}
            doUpdateCellColor={this.doUpdateDrawingMeta}
            isReadOnly={false}
          />
        </section>
      </div>
    );
  }
}

export default GameView;
