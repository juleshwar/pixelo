import React, { Component } from "react";
import { ReactComponent as PixeloIcon64 } from "../assets/svgs/pixelo_icon_64.svg";

export class LoadingIcon extends Component {
  constructor(props) {
    super(props);
    this.pixeloIconRef = React.createRef();
  }

  async delay(timeInMs) {
    return new Promise((res) => {
      setTimeout((_) => res(), timeInMs);
    });
  }

  async animatePixeloIcon() {
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
      const squareAtIndex = pixeloIconSvg.querySelector(
        `#${String.fromCharCode(i)}`
      );
      squareAtIndex.style.fill = PALETTE[paletteIndex % PALETTE.length];
      await this.delay(500);
      squareAtIndex.style.fill = "#FFFFFF";
    };

    for (let i = getCharCode("a"); i <= getCharCode("j"); i++, paletteIndex++) {
      await animateSquareAtIndex(i);
    }
    for (let i = getCharCode("c"); i >= getCharCode("a"); i--, paletteIndex++) {
      await animateSquareAtIndex(i);
    }
    await this.delay(500);
  }

  async loopPixeloIconAnimation() {
    while (1) {
      await this.animatePixeloIcon();
    }
  }

  componentDidMount() {
    this.loopPixeloIconAnimation();
  }

  render() {
    return <PixeloIcon64 ref={this.pixeloIconRef} className="h-20" />;
  }
}

export default LoadingIcon;
