import React, { Component, createRef } from "react";
import FireworkService from "../../services/FireworkService";
import PropTypes from "prop-types";

export class FireworksCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fS: undefined,
    };
    this.fireworksCanvas = createRef();
  }
  componentDidMount() {
    this.setState({
      fS: new FireworkService(this.fireworksCanvas.current, true),
    });
  }
  static props = {
    className: PropTypes.string,
    startAnimationLoop: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    className: "",
  };
  render() {
    const { startAnimationLoop } = this.props;
    const { fS } = this.state;

    if (this.fireworksCanvas.current) {
      if (startAnimationLoop) {
        /**
         * setTimeout here is added to give @component FireworksCanvas's parent container enough time to update
         * its dimensions. The @service FireworkService takes the canvas's parent container's dimensions
         * and sets it to the canvas element. If the parent container is hidden (@component GameView's case), the
         * canvas's dimensions would get set to 0px x 0px :(
         */
        window.setTimeout(() => {
          fS.startAnimationLoop();
        });
      } else {
        fS.stopAnimationLoop();
      }
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
