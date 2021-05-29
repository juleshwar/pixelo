const PIXELO_SETTINGS_LOCAL_STORAGE_KEY = "Pixelo_Settings";

const SETTINGS_OPTIONS = {
  GAME_LAYOUT: "layout",
};

const GAME_LAYOUT = {
  CLASSIC: "classic",
  MODERN: "modern",
};

const DEFAULT_PIXELO_SETTINGS = {
  [SETTINGS_OPTIONS.GAME_LAYOUT]: GAME_LAYOUT.MODERN,
};

class LocalStorageServiceBean {
  pixeloSettings = this.attemptRetrievePixeloSettingsFromLocalStorage();
  areStorageApisAvailable = this.checkIfStorageApiAvailable("localStorage");

  toggleSetting(prop) {
    if (prop === SETTINGS_OPTIONS.GAME_LAYOUT) {
      this.toggleGameLayout();
    }
  }

  toggleGameLayout() {
    if (this.getItem(SETTINGS_OPTIONS.GAME_LAYOUT) === GAME_LAYOUT.CLASSIC) {
      this.setItem(SETTINGS_OPTIONS.GAME_LAYOUT, GAME_LAYOUT.MODERN);
    } else {
      this.setItem(SETTINGS_OPTIONS.GAME_LAYOUT, GAME_LAYOUT.CLASSIC);
    }
  }

  getItem(prop) {
    return this.pixeloSettings[prop];
  }

  setItem(prop, value) {
    this.pixeloSettings[prop] = value;
    this.attemptUpdatePixeloSettingsInLocalStorage(prop, value);
  }

  attemptUpdatePixeloSettingsInLocalStorage() {
    if (this.areStorageApisAvailable) {
      window.localStorage.setItem(
        PIXELO_SETTINGS_LOCAL_STORAGE_KEY,
        JSON.stringify(this.pixeloSettings)
      );
    }
  }

  attemptRetrievePixeloSettingsFromLocalStorage() {
    if (this.areStorageApisAvailable) {
      const pixeloSettingsString = window.localStorage.getItem(
        PIXELO_SETTINGS_LOCAL_STORAGE_KEY
      );
      if (pixeloSettingsString) {
        return JSON.parse(
          window.localStorage.getItem(PIXELO_SETTINGS_LOCAL_STORAGE_KEY)
        );
      } else {
        return DEFAULT_PIXELO_SETTINGS;
      }
    } else {
      return DEFAULT_PIXELO_SETTINGS;
    }
  }

  checkIfStorageApiAvailable(type) {
    let storage;
    try {
      storage = window[type];
      var x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }
}
const LocalStorageService = new LocalStorageServiceBean();
export { LocalStorageService };
