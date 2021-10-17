import { Express } from "express";

import {
  selectList,
  postList,
  removeList,
  allLists,
  updateOneList,
} from "./list";
import { postChor, removeChor, allListsChors, updateOneChor } from "./chor";

export const setRoutes = (app: Express): void => {
  postList(app);
  selectList(app);
  removeList(app);
  allLists(app);
  updateOneList(app);
  postChor(app);
  removeChor(app);
  allListsChors(app);
  updateOneChor(app);
};
