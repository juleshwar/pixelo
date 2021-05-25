import { Component } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import PopupDialogBox from "./PopupDialogBox";

export class FullPageDialog extends Component {
  static props = {
    className: PropTypes.string,
    showDialog: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    className: "",
  };

  constructor(props) {
    super(props);
    this.dialogContainer = document.createElement("div");
    this.dialogContainer.classList.add(
      "z-10",
      "absolute",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "flex",
      "items-center",
      "justify-center",
      "overflow-hidden",
      "pointer-events-none"
    );
    this.rootElement = document.getElementById("root");
  }
  componentDidMount() {
    this.rootElement.appendChild(this.dialogContainer);
  }
  componentWillUnmount() {
    this.rootElement.removeChild(this.dialogContainer);
  }
  render() {
    const { className, children, showDialog, dialogBoxConfig } = this.props;
    if (showDialog) {
      this.dialogContainer.classList.remove("invisible");
      this.dialogContainer.classList.add("visible");
    } else {
      this.dialogContainer.classList.remove("visible");
      this.dialogContainer.classList.add("invisible");
    }
    return ReactDom.createPortal(
      <PopupDialogBox
        className={`${className} pointer-events-auto transform transition-transform duration-500 ${
          showDialog ? "translate-y-0 visible" : "invisible translate-y-full"
        }`}
        {...dialogBoxConfig}
      >
        {children}
      </PopupDialogBox>,
      this.dialogContainer
    );
  }
}

export default FullPageDialog;
