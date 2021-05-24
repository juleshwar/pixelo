import React, { Component } from "react";
import PropTypes from "prop-types";
import PixeloButton from "../PixeloButton";

export class PopupDialogBox extends Component {
  constructor(props) {
    super(props);
    this.onClickPrimaryButton = this.onClickPrimaryButton.bind(this);
    this.onClickSecondaryButton = this.onClickSecondaryButton.bind(this);
  }

  static props = {
    className: PropTypes.string,
    confirm: PropTypes.func,
    deny: PropTypes.func,
  };

  static defaultProps = {
    className: "",
    confirm: () => {},
    deny: () => {},
  };

  onClickPrimaryButton() {
    this.props.confirm();
  }

  onClickSecondaryButton() {
    this.props.deny();
  }

  render() {
    const {
      children,
      primaryButtonText,
      secondaryButtonText,
      className,
    } = this.props;
    return (
      <div
        className={`${className} flex flex-col w-106 h-106 px-8 py-4 bg-white rounded`}
      >
        <div className="h-4/5">{children}</div>
        <div className="flex-1 grid grid-cols-2 gap-8 py-2">
          <PixeloButton
            onClick={this.onClickSecondaryButton}
            className={secondaryButtonText ? "" : "invisible"}
          >
            {secondaryButtonText}
          </PixeloButton>
          <PixeloButton
            onClick={this.onClickPrimaryButton}
            className="bg-green-400"
          >
            {primaryButtonText}
          </PixeloButton>
        </div>
      </div>
    );
  }
}

export default PopupDialogBox;
