import { Express } from "express";

import {
  selectList,
  postList,
  removeList,
  allLists,
  updateOneList,
} from "./list";
import { postChor, removeChor, allListsChors, updateOneChor } from "./chor";
import { postChorTag, removeChorTag, updateOneChorTag } from "./chorTag";
import { postListTag, removeListTag, updateOneListTag } from "./listTag";

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
  postListTag(app);
  removeListTag(app);
  updateOneListTag(app);
  postChorTag(app);
  removeChorTag(app);
  updateOneChorTag(app);
};
