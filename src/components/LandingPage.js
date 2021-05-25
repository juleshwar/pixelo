import React, { Component } from "react";
import { Link } from "react-router-dom";
import PixeloStateHandler from "../services/PixeloStateHandler";
import * as UtilMethods from "../services/UtilFunctions";
import { ReactComponent as TransparentPixeloLogo } from "../assets/svgs/transparent-pixelo-logo.svg";

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

    const COLOR_PALETTE = PixeloStateHandler.COLOR_PALETTE;

    /* Step 1: Initial color change */
    UtilMethods.modifyCursorOnColorSelect(COLOR_PALETTE[this.state.colorIndex]);

    /* Step 2: Subsequent color changes */
    const colorsLength = COLOR_PALETTE.length;
    const intervalId = window.setInterval(() => {
      if (this.state.colorIndex === colorsLength - 1) {
        this.setState({ colorIndex: 0 });
      } else {
        this.setState({ colorIndex: this.state.colorIndex + 1 });
      }
      UtilMethods.modifyCursorOnColorSelect(
        COLOR_PALETTE[this.state.colorIndex]
      );
    }, 1000);

    this.setState({ cursorColorInterval: intervalId });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.cursorColorInterval);
  }

  render() {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <TransparentPixeloLogo
          className="h-auto w-64 transition ease-in duration-500 phone:w-1/2 laptop:w-5/12 desktop:w-120"
          fill={PixeloStateHandler.COLOR_PALETTE[this.state.colorIndex]}
        />
        <Link to="/play" className="mt-10 text-blue-500">
          click here to play
        </Link>
      </div>
    );
  }
}

export default LandingPage;
