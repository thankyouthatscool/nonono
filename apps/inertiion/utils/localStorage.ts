import AsyncStorage from "@react-native-async-storage/async-storage";

enum LocalStorageKeys {
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
    const searchTerm = JSON.parse(resString) as string;

    return searchTerm;
  }

  return null;
};
