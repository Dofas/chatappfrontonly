import dataBase from "../database.json";

export const fetchDataBase = (url) => {
  const mockUrl = dataBase[url];
  return Promise.resolve(mockUrl);
};
