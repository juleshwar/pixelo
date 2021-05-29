import React, { Component } from "react";
import { LocalStorageService } from "../services/LocalStorageService";

export class RouteSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pixeloSettings: LocalStorageService.pixeloSettings,
    };
  }
  onChangeSetting(settingKey) {
    LocalStorageService.toggleSetting(settingKey);
    this.setState({ pixeloSettings: LocalStorageService.pixeloSettings });
  }
  render() {
    const pixeloSettings = this.state.pixeloSettings;
    const listItems = [];
    for (const settingKey in pixeloSettings) {
      if (Object.hasOwnProperty.call(pixeloSettings, settingKey)) {
        const settingValue = pixeloSettings[settingKey];
        listItems.push(
          <li key={settingKey}>
            {settingKey}:
            <button onClick={this.onChangeSetting.bind(this, settingKey)}>
              {settingValue}
            </button>
          </li>
        );
      }
    }
    return (
      <section className="h-full grid place-items-center place-content-center">
        <ul>{listItems}</ul>
      </section>
    );
  }
}

export default RouteSettings;
