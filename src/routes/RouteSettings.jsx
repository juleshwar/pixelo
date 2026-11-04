import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  LocalStorageService,
  LOCAL_STORAGE_PROPS,
} from "../services/LocalStorageService";

const SETTINGS_LIST = [LOCAL_STORAGE_PROPS.GAME_LAYOUT];

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
    const listItems = SETTINGS_LIST.map((settingKey) => {
      const settingValue = pixeloSettings[settingKey];
      return (
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
    });

    return (
      <section className="h-full grid place-items-center gap-7 place-content-center">
        <div className="flex items-center justify-center w-96 relative">
          <Link to="/" className="text-2xl absolute left-0">
            🔙
          </Link>
          <h1 className="text-3xl">Settings</h1>
        </div>
        <ul className="w-96 grid gap-3 text-2xl">{listItems}</ul>
      </section>
    );
  }
}

export default RouteSettings;
