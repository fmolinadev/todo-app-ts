const TODOS_STORAGE = "todos";

export const setToDosInStorage = (payload: Array<any>): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      localStorage.setItem(TODOS_STORAGE, JSON.stringify(payload));
      resolve(true);
    } catch (error) {
      reject(false);
    }
  });
};

export const getToDosFromStorage = <T,>(): T => {
  const flagData = localStorage.getItem(TODOS_STORAGE);
  return flagData ? JSON.parse(flagData) : [];
};

export const clearToDosFromStorage = () => {
  return localStorage.clear();
};
