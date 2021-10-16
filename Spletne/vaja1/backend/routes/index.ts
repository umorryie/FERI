import { Express } from "express";

import { postInsertList } from "./list";

export const setRoutes = (app: Express): void => {
  postInsertList(app);
};
