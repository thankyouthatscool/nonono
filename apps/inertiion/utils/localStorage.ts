import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppSettings, AppSettingsKeys, DEFAULT_APP_SETTINGS } from "@types";

enum LocalStorageKeys {
  APP_SETTINGS = "appSettings",
  CHECKED_ITEM_QUEUE = "checkedItemQueue",
  IS_CHECKED_QUEUE_HIDDEN = "isCheckedQueueHidden",
  ITEM_QUEUE = "itemQueue",
  SEARCH_TERM = "searchTerm",
}

// Item Queue
export const setItemQueue = () => {};

export const getItemQueue = () => {};

// Search Term
export const setSearchTerm = async (searchTerm: string) => {
  await AsyncStorage.setItem(LocalStorageKeys.SEARCH_TERM, searchTerm);
};

export const getSearchTerm = async () => {
  const resString = await AsyncStorage.getItem(LocalStorageKeys.SEARCH_TERM);

  if (!!resString) {
    const searchTerm = JSON.parse(resString);

    return searchTerm;
  }

  return null;
};

// App Settings
export const setAppSettings = async (setting: AppSettingsKeys, data: any) => {
  const resString = await AsyncStorage.getItem(LocalStorageKeys.APP_SETTINGS);

  if (!!resString) {
    const appSettings = JSON.parse(resString) as AppSettings;

    await AsyncStorage.setItem(
      LocalStorageKeys.APP_SETTINGS,
      JSON.stringify({ ...appSettings, [setting]: data })
    );
  } else {
    await AsyncStorage.setItem(
      LocalStorageKeys.APP_SETTINGS,
      JSON.stringify({ ...DEFAULT_APP_SETTINGS, [setting]: data })
    );
  }
};

export const getAppSettings = async () => {
  const resString = await AsyncStorage.getItem(LocalStorageKeys.APP_SETTINGS);

  if (!!resString) {
    const appSettings = JSON.parse(resString) as AppSettings;

    return appSettings;
  } else {
    return DEFAULT_APP_SETTINGS;
  }
};

export const resetAppSettings = async () => {
  await AsyncStorage.setItem(
    LocalStorageKeys.APP_SETTINGS,
    JSON.stringify(DEFAULT_APP_SETTINGS)
  );

  return DEFAULT_APP_SETTINGS;
};
