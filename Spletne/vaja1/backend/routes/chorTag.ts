import { NextFunction, Request, Response, Router } from "express";

import {
  chorListTagIdValidationSchema,
  insertUpdateChorListTagValidationSchema,
} from "../validations/chorListTag";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { ErrorMessages, ErrorNames } from "../constants";
import { insertChorTag, deleteChorTag, updateChorTag } from "../utils/chorTag";

export const postChorTag = (app: Router): Router => {
  return app.post(
    "/chor-tag",
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

      const chorTag = await insertChorTag(value.name, value.id);

      res.status(chorTag ? 201 : 500).json({ chorTag });
    }
  );
};

export const removeChorTag = (app: Router): Router => {
  return app.delete(
    "/chor-tag",
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

      const deletedChorTag = await deleteChorTag(value.id);

      if (deletedChorTag) {
        return res.status(204).json();
      }

      return res.status(500).json({ chorTagDeleted: false });
    }
  );
};

export const updateOneChorTag = (app: Router): Router => {
  return app.put(
    "/chor-tag",
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

      const updatedChorTag = await updateChorTag(value.name, value.id);

      res.status(updatedChorTag ? 200 : 500).json({ updatedChorTag });
    }
  );
};
