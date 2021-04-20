import { Component } from "react";
import PropTypes from "prop-types";
import ColorCell from "./ColorCell";

export class SelectableColorCell extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    let modifiedProps = JSON.parse(JSON.stringify(this.props));
    delete modifiedProps.isSelected;

    let innerContent;
    if (this.props.isSelected) {
      innerContent = <span>✅</span>;
    }

    const classes = this.props.className + " flex items-center justify-center";

    return (
      <ColorCell
        {...modifiedProps}
        className={classes}
        onClick={this.props.onClick}
        content={innerContent}
      ></ColorCell>
    );
  }
}

export default SelectableColorCell;
