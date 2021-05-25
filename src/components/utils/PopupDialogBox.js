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
        className={`${className} flex flex-col w-80 h-96 px-6 py-4 text-xl bg-white rounded landscape:h-64 landscape:w-64 tablet:w-106 tablet:h-106 tablet:px-8 tablet:text-2xl landscape:text-lg`}
      >
        <div className="h-4/5">{children}</div>
        <div className="flex-1 grid grid-cols-2 gap-8 py-2 text-lg landscape:text-base tablet:text-2xl">
          <PixeloButton
            onClick={this.onClickSecondaryButton}
            className={secondaryButtonText ? "" : "invisible"}
          >
            {secondaryButtonText}
          </PixeloButton>
          <PixeloButton
            onClick={this.onClickPrimaryButton}
            className="text-gray-700 bg-green-400 bg-gradient-to-r hover:from-green-400 hover:to-yellow-300"
          >
            {primaryButtonText}
          </PixeloButton>
        </div>
      </div>
    );
  }
}

export default PopupDialogBox;
