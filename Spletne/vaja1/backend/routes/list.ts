import { NextFunction, Request, Response, Router } from "express";

import { insertListValidationSchema } from "../validations/list";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { ErrorMessages, ErrorNames } from "../constants";
import { insertList } from "../utils/list";

export const postInsertList = (app: Router): Router => {
  return app.post(
    "/list",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = insertListValidationSchema.validate(req.body);

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

      const listInserted = await insertList(value.name);

      res
        .status(listInserted ? 201 : 500)
        .json({ listInserted: !!listInserted });
    }
  );
};
