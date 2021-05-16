import { Component } from "react";
import PropTypes from "prop-types";

export class ColorCell extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    cellSize: PropTypes.number.isRequired,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    const cellSize = this.props.cellSize;
    const classes =
      "relative rounded " +
      (cellSize ? `h-${cellSize} w-${cellSize} ` : "") +
      this.props.className;
    return (
      <div
        className={classes}
        style={{ background: this.props.color }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ColorCell;
