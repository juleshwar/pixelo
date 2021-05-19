import React, { Component } from "react";
import { ReactComponent as PixeloIcon64 } from "../assets/svgs/pixelo_icon_64.svg";

export class LoadingIcon extends Component {
  constructor(props) {
    super(props);
    this.pixeloIconRef = React.createRef();
    this.doAnimate = true;
  }

  async delay(timeInMs) {
    return new Promise((res) => {
      setTimeout((_) => res(), timeInMs);
    });
  }

  async animatePixeloIcon() {
    const ANIMATION_DELAY = 500;
    const pixeloIconSvg = this.pixeloIconRef.current;
    const PALETTE = [
      "#1F2937",
      "#9CA3AF",
      "#10B981",
      "#60A5FA",
      "#BE185D",
      "#F87171",
      "#F59E0B",
      "#8B5CF6",
    ];
    let paletteIndex = 0;
    const getCharCode = (char) => char.charCodeAt(0);
    const animateSquareAtIndex = async (i) => {
      if (!this.doAnimate) {
        /**
         * This is to abruptly stop the subsequent async code from running as the current component has been
         * removed from the DOM already
         */
        throw new Error("No need to animate no more");
      }

      const squareAtIndex = pixeloIconSvg.querySelector(
        `#${String.fromCharCode(i)}`
      );
      squareAtIndex.style.fill = PALETTE[paletteIndex % PALETTE.length];
      await this.delay(ANIMATION_DELAY);
      squareAtIndex.style.fill = "#FFFFFF";
    };

    for (let i = getCharCode("a"); i <= getCharCode("j"); i++, paletteIndex++) {
      try {
        await animateSquareAtIndex(i);
      } catch (error) {
        // noop
      }
    }
    for (let i = getCharCode("c"); i >= getCharCode("a"); i--, paletteIndex++) {
      try {
        await animateSquareAtIndex(i);
      } catch (error) {
        // noop
      }
    }
    await this.delay(ANIMATION_DELAY);
  }

  async loopPixeloIconAnimation() {
    while (this.doAnimate) {
      await this.animatePixeloIcon();
    }
  }

  componentDidMount() {
    this.loopPixeloIconAnimation();
  }

  componentWillUnmount() {
    this.doAnimate = false;
  }

  render() {
    return <PixeloIcon64 ref={this.pixeloIconRef} className="h-20" />;
  }
}

export default LoadingIcon;
