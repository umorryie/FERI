import { Express } from "express";

import {
  selectList,
  postList,
  removeList,
  allLists,
  updateOneList,
} from "./list";

export const setRoutes = (app: Express): void => {
  postList(app);
  selectList(app);
  removeList(app);
  allLists(app);
  updateOneList(app);
};
