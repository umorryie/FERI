import { NextFunction, Request, Response, Router } from "express";

import {
  listNameValidationSchema,
  listIdValidationSchema,
  updateListValidationSchema,
} from "../validations/list";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { ErrorMessages, ErrorNames } from "../constants";
import {
  insertList,
  getList,
  getAllLists,
  deleteList,
  updateList,
} from "../utils/list";

export const postList = (app: Router): Router => {
  return app.post(
    "/list",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = listNameValidationSchema.validate(req.body);

      if (error) {
        return next(
          new ErrorHandler(
            400,
            error?.details?.[0]?.message ||
              ErrorMessages.REQUEST_PARAMETER_VALIDATION,
            ErrorNames.VALIDATION_ERROR
          )
        );
      }

      const list = await insertList(value.name);

      res.status(list ? 201 : 500).json({ list });
    }
  );
};

export const selectList = (app: Router): Router => {
  return app.get(
    "/list/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = listIdValidationSchema.validate(req.params);

      if (error) {
        return next(
          new ErrorHandler(
            400,
            error?.details?.[0]?.message ||
              ErrorMessages.REQUEST_PARAMETER_VALIDATION,
            ErrorNames.VALIDATION_ERROR
          )
        );
      }

      const list = await getList(value.id);

      res.status(list ? 200 : 500).json({ list });
    }
  );
};

export const removeList = (app: Router): Router => {
  return app.delete(
    "/list",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = listIdValidationSchema.validate(req.body);

      if (error) {
        return next(
          new ErrorHandler(
            400,
            error?.details?.[0]?.message ||
              ErrorMessages.REQUEST_PARAMETER_VALIDATION,
            ErrorNames.VALIDATION_ERROR
          )
        );
      }

      const deletedList = await deleteList(value.id);

      if (deletedList) {
        return res.status(204).json();
      }

      return res.status(500).json({ listDeleted: false });
    }
  );
};

export const allLists = (app: Router): Router => {
  return app.get("/lists", async (req: Request, res: Response) => {
    const lists = await getAllLists();

    res.status(lists ? 200 : 500).json({ lists });
  });
};

export const updateOneList = (app: Router): Router => {
  return app.put(
    "/list",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = updateListValidationSchema.validate(req.body);

      if (error) {
        return next(
          new ErrorHandler(
            400,
            error?.details?.[0]?.message ||
              ErrorMessages.REQUEST_PARAMETER_VALIDATION,
            ErrorNames.VALIDATION_ERROR
          )
        );
      }

      const updatedList = await updateList(value.id, value.name);

      res.status(updatedList ? 200 : 500).json({ updatedList });
    }
  );
};
