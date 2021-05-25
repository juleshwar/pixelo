import { Component } from "react";
import PropTypes from "prop-types";

export class ColorCell extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    return (
      <div
        className={`${this.props.className} relative rounded`}
        style={{ background: this.props.color }}
        onClick={this.props.onClick}
        draggable={false}
      >
        {this.props.children}
      </div>
    );
  }
}

export default ColorCell;
