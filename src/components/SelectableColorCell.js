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

    return (
      <ColorCell
        {...modifiedProps}
        className={`${className} flex items-center justify-center`}
        onClick={this.props.onClick}
      >
        {this.props.isSelected && <span className="text-s">✅</span>}
      </ColorCell>
    );
  }
}

export default SelectableColorCell;
