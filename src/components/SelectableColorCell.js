import { Component } from "react";
import PropTypes from "prop-types";
import ColorCell from "./ColorCell";

export class SelectableColorCell extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    let { isSelected, className, ...modifiedProps } = this.props;

    const classes = className + " flex items-center justify-center";

    return (
      <ColorCell
        {...modifiedProps}
        className={classes}
        onClick={this.props.onClick}
      >
        {this.props.isSelected && <span>✅</span>}
      </ColorCell>
    );
  }
}

export default SelectableColorCell;
