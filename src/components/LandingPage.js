import React, { Component } from "react";
import { Link } from "react-router-dom";
import { COLOR_PALETTE } from "../constants/components/PaletteBarConstants";
import * as UtilMethods from "../services/UtilFunctions";
import PixeloLogo from "./svgs/PixeloLogo";

export class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorIndex: 0,
      cursorColorInterval: null,
    };
  }

  componentDidMount() {
    this.addCursorColorAnimation();
  }

  addCursorColorAnimation() {
    /* Setting an animation which changes the cursor color every second :) */

    /* Step 1: Initial color change */
    UtilMethods.modifyCursorOnColorSelect(COLOR_PALETTE[this.state.colorIndex]);
    this.setState({ colorIndex: this.state.colorIndex + 1 });

    /* Step 2: Subsequent color changes */
    const colorsLength = COLOR_PALETTE.length;
    const intervalId = window.setInterval(() => {
      UtilMethods.modifyCursorOnColorSelect(
        COLOR_PALETTE[this.state.colorIndex]
      );
      if (this.state.colorIndex === colorsLength - 1) {
        this.setState({ colorIndex: 0 });
      } else {
        this.setState({ colorIndex: this.state.colorIndex + 1 });
      }
    }, 1000);

    this.setState({ cursorColorInterval: intervalId });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.cursorColorInterval);
  }

  render() {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <PixeloLogo className="h-auto w-64 sm:w-1/2 lg:w-5/12 xl:w-120" />
        <Link to="/play" className="mt-10 text-blue-500">
          click here to play
        </Link>
      </div>
    );
  }
}

export default LandingPage;
