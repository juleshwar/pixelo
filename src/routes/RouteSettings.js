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
          <li key={settingKey} className="flex justify-between items-center">
            <p className="capitalize w-1/5">{settingKey}</p>
            <hr className="w-3/5 border-gray-300 mx-6" />
            <button
              onClick={this.onChangeSetting.bind(this, settingKey)}
              className="capitalize w-1/5"
            >
              {settingValue}
            </button>
          </li>
        );
      }
    }
    return (
      <section className="h-full grid place-items-center gap-7 place-content-center">
        <h1 className="text-3xl">Settings</h1>
        <ul className="w-96 grid gap-3 text-2xl">{listItems}</ul>
      </section>
    );
  }
}

export default RouteSettings;
