import React, { Component } from "react";
import PropTypes from "prop-types";

export class PixeloInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
    };
    this.onChangeTextValue = this.onChangeTextValue.bind(this);
  }

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    errorMessage: PropTypes.string,
    onChangeHandler: PropTypes.func.isRequired,
  };

  static defaultProps = {
    label: "",
    value: "",
    className: "",
    errorMessage: "Please provide a value",
  };

  onChangeTextValue(inputEvent) {
    const textValue = inputEvent.target.value;
    this.setState({ showError: textValue === "" });
    this.props.onChangeHandler(textValue);
  }

  render() {
    const { label, value, className, errorMessage, ...otherProps } = this.props;
    return (
      <div className={`grid gap-1 justify-start ${this.props.className}`}>
        <label className="text-xs text-gray-600">{this.props.label}</label>
        <input
          type="text"
          value={this.props.value}
          onChange={this.onChangeTextValue}
          className={
            "rounded outline-none border border-gray-400 w-72 h-10 p-3 text-gray-800 " +
            (this.state.showError ? "border-red-400" : "")
          }
          {...otherProps}
        ></input>
        <label
          className={
            "text-xs text-red-600 " + (this.state.showError ? "" : "hidden")
          }
        >
          {this.props.errorMessage}
        </label>
      </div>
    );
  }
}

export default PixeloInput;
