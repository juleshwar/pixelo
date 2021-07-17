import React from "react";
import ReactDom from "react-dom";
import { App as PixeloApp } from "../App";

class BootstrapperBean {
  attachPostMessageListener() {
    window.addEventListener("message", this.messageHandler.bind(this))
  }

  messageHandler(e) {
    const { action, data } = e.data;
    if (action === "bootstrapPixelo") {
      this.bootstrapPixelo(data.elementSelector)
    }
  }

  bootstrapPixelo(elementSelector = "pixelo-element") {
    ReactDom.render(
      <React.StrictMode>
        <PixeloApp />
      </React.StrictMode>,
      document.getElementById(elementSelector)
    );
  }
}
const Bootstrapper = new BootstrapperBean();
export { Bootstrapper };
