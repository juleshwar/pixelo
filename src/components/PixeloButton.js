import React, { Component } from "react";
import PropTypes from "prop-types";

export class PixeloButton extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  };

  render() {
    const { children, className, ...finalProps } = this.props;

    return (
      <button
        {...finalProps}
        className={`${className} flex items-center justify-center p-1 cursor-default rounded border border-gray-400 bg-white text-gray-600 disabled:opacity-50 disabled:border-gray-500 disabled:bg-gray-300 disabled:cursor-not-allowed`}
      >
        {children}
      </button>
    );
  }
}

export default PixeloButton;
