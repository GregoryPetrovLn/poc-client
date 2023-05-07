export const getItemFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key as string);

    if (item === null) {
      return null;
    }
    if (typeof item === "string") {
      return item as T;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setItemToLocalStorage = (
  key: string,
  value: string | boolean | number
) => {
  localStorage.setItem(key, value.toString());
};
