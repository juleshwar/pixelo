import React, { Component, createRef } from "react";
import FireworkService from "../../services/FireworkService";
import PropTypes from "prop-types";

export class FireworksCanvas extends Component {
  static props = {
    className: PropTypes.string,
  };
  static defaultProps = {
    className: "",
  };
  constructor(props) {
    super(props);
    this.fireworksCanvas = createRef();
  }
  render() {
    if (this.fireworksCanvas.current) {
      const fS = new FireworkService(this.fireworksCanvas.current, true);
      fS.fireworkAnimationLoop();
    }
    return (
      <canvas
        ref={this.fireworksCanvas}
        className={`${this.props.className} h-full w-full`}
      ></canvas>
    );
  }
}

export default FireworksCanvas;
