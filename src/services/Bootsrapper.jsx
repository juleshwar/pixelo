import React from "react";
import { createRoot } from "react-dom/client";
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
    createRoot(
      document.getElementById(elementSelector)
    ).render(
      <React.StrictMode>
        <PixeloApp />
      </React.StrictMode>,
    )
  }
}
const Bootstrapper = new BootstrapperBean();
export { Bootstrapper };
