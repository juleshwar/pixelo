const PIXELO_SETTINGS_LOCAL_STORAGE_KEY = "Pixelo_Settings";

const LOCAL_STORAGE_PROPS = {
  GAME_LAYOUT: "layout",
  TOUR_COMPLETED: "tour_completed",
};

const GAME_LAYOUT = {
  CLASSIC: "classic",
  MODERN: "modern",
};

const DEFAULT_PIXELO_SETTINGS = {
  [LOCAL_STORAGE_PROPS.GAME_LAYOUT]: GAME_LAYOUT.MODERN,
  [LOCAL_STORAGE_PROPS.TOUR_COMPLETED]: false,
};

class LocalStorageServiceBean {
  pixeloSettings = undefined;
  areStorageApisAvailable = this.checkIfStorageApiAvailable("localStorage");

  constructor() {
    this.pixeloSettings = this.attemptRetrievePixeloSettingsFromLocalStorage();
  }

  //#region Util functions
  toggleSetting(prop) {
    if (prop === LOCAL_STORAGE_PROPS.GAME_LAYOUT) {
      this.toggleGameLayout();
    }
  }

  toggleGameLayout() {
    if (this.getItem(LOCAL_STORAGE_PROPS.GAME_LAYOUT) === GAME_LAYOUT.CLASSIC) {
      this.setItem(LOCAL_STORAGE_PROPS.GAME_LAYOUT, GAME_LAYOUT.MODERN);
    } else {
      this.setItem(LOCAL_STORAGE_PROPS.GAME_LAYOUT, GAME_LAYOUT.CLASSIC);
    }
  }

  getTourCompleted() {
    return this.getItem(LOCAL_STORAGE_PROPS.TOUR_COMPLETED);
  }

  setTourCompleted() {
    this.setItem(LOCAL_STORAGE_PROPS.TOUR_COMPLETED, true);
  }
  //#endregion Util functions

  getItem(prop) {
    return this.pixeloSettings[prop];
  }

  setItem(prop, value) {
    this.pixeloSettings[prop] = value;
    this.attemptUpdatePixeloSettingsInLocalStorage();
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
export { LocalStorageService, GAME_LAYOUT };
