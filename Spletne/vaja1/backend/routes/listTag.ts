import { NextFunction, Request, Response, Router } from "express";

import {
  chorListTagIdValidationSchema,
  insertUpdateChorListTagValidationSchema,
} from "../validations/chorListTag";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { ErrorMessages, ErrorNames } from "../constants";
import { insertListTag, deleteListTag, updateListTag } from "../utils/listTag";

export const postListTag = (app: Router): Router => {
  return app.post(
    "/list-tag",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = insertUpdateChorListTagValidationSchema.validate(
        req.body
      );

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

      const listTag = await insertListTag(value.name, value.id);

      res.status(listTag ? 201 : 500).json({ listTag });
    }
  );
};

export const removeListTag = (app: Router): Router => {
  return app.delete(
    "/list-tag",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = chorListTagIdValidationSchema.validate(req.body);

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

      const deletedListTag = await deleteListTag(value.id);

      if (deletedListTag) {
        return res.status(204).json();
      }

      return res.status(500).json({ listTagDeleted: false });
    }
  );
};

export const updateOneListTag = (app: Router): Router => {
  return app.put(
    "/list-tag",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = insertUpdateChorListTagValidationSchema.validate(
        req.body
      );

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

      const updatedListTag = await updateListTag(value.id, value.id);

      res.status(updatedListTag ? 200 : 500).json({ updatedListTag });
    }
  );
};
