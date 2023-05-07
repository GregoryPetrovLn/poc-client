export const getItemFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "null"); 
};

export const setItemToLocalStorage = (
  key: string,
  value: string | boolean | number
) => {
  localStorage.setItem(key, value.toString());
};
