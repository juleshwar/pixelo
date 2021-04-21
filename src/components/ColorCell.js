import { Component } from "react";
import PropTypes from "prop-types";

export class ColorCell extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    content: PropTypes.element,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    const classes = "relative " + this.props.className;
    return (
      <div
        className={classes}
        style={Object.assign({}, { background: this.props.color })}
        onClick={this.props.onClick}
      >
        {this.props.content}
      </div>
    );
  }
}

export default ColorCell;
