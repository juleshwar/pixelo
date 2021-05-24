import React, { Component, createRef } from "react";
import FireworkService from "../../services/FireworkService";
import PropTypes from "prop-types";

export class FireworksCanvas extends Component {
  static props = {
    className: PropTypes.string,
    startAnimationLoop: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    className: "",
  };
  constructor(props) {
    super(props);
    this.fireworksCanvas = createRef();
  }
  render() {
    const { startAnimationLoop } = this.props;
    if (this.fireworksCanvas.current && startAnimationLoop) {
      /**
       * setTimeout here is added to give @component FireworksCanvas's parent container enough time to update
       * its dimensions. The @service FireworkService takes the canvas's parent container's dimensions
       * and sets it to the canvas element. If the parent container is hidden (@component GameView's case), the
       * canvas's dimensions would get set to 0px x 0px :(
       */
      window.setTimeout(() => {
        const fS = new FireworkService(this.fireworksCanvas.current, true);
        fS.fireworkAnimationLoop();
      });
    }
    return (
      <canvas
        ref={this.fireworksCanvas}
        className={`${this.props.className}`}
      ></canvas>
    );
  }
}

export default FireworksCanvas;
