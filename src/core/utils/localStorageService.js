// localStorageService.js
const STORAGE_KEY_PREFIX = 'app-';

const setItem = (key, value) => {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {

  }
};

const getItem = (key) => {
  try {
    const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

const removeItem = (key) => {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
  } catch (error) {

  }
};

const clear = () => {
  try {
    localStorage.clear();
  } catch (error) {

  }
};

export const localStorageService = {
  setItem,
  getItem,
  removeItem,
  clear,
};
