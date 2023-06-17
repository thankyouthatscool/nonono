import AsyncStorage from "@react-native-async-storage/async-storage";

enum LocalStorageKeys {
  APP_SETTINGS = "appSettings",
  CHECKED_ITEM_QUEUE = "checkedItemQueue",
  IS_CHECKED_QUEUE_HIDDEN = "isCheckedQueueHidden",
  ITEM_QUEUE = "itemQueue",
  SEARCH_TERM = "searchTerm",
}

export enum AppSettings {
  IS_DATABASE_LIVE_EDITS = "isDatabaseLiveEdits",
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
    const searchTerm = JSON.parse(resString) as string;

    return searchTerm;
  }

  return null;
};

// App Settings
export const setAppSettings = async (setting: AppSettings, data: any) => {
  const resString = await AsyncStorage.getItem(LocalStorageKeys.APP_SETTINGS);

  if (!!resString) {
    const appSettings = JSON.parse(resString) as {
      [AppSettings.IS_DATABASE_LIVE_EDITS]: boolean;
    };

    await AsyncStorage.setItem(
      LocalStorageKeys.APP_SETTINGS,
      JSON.stringify({ ...appSettings, [setting]: data })
    );
  } else {
    await AsyncStorage.setItem(
      LocalStorageKeys.APP_SETTINGS,
      JSON.stringify({ [setting]: data })
    );
  }
};

export const getAppSettings = async () => {
  const resString = await AsyncStorage.getItem(LocalStorageKeys.APP_SETTINGS);

  if (!!resString) {
    const appSettings = JSON.parse(resString) as {
      isDatabaseLiveEdits: boolean;
    };

    return appSettings;
  } else {
    return null;
  }
};

export const resetAppSettings = async () => {
  await AsyncStorage.setItem(
    LocalStorageKeys.APP_SETTINGS,
    JSON.stringify({ isDatabaseLiveEdits: false })
  );

  return { isDatabaseLiveEdits: false };
};
