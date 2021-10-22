import { NextFunction, Request, Response, Router } from "express";

import {
  updateChorValidationSchema,
  insertChorValidationSchema,
  chorIdValidationSchema,
} from "../validations/chor";
import { ErrorHandler } from "../errorHandler/errorHandler";
import { ErrorMessages, ErrorNames } from "../constants";
import {
  insertChor,
  getAllListsChors,
  deleteChor,
  updateChor,
} from "../utils/chor";

export const postChor = (app: Router): Router => {
  return app.post(
    "/chor",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = insertChorValidationSchema.validate(req.body);

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

      const chor = await insertChor(
        value.name,
        value.listId,
        value.until,
        value.alertBeforeHours
      );

      res.status(chor ? 201 : 500).json({ chor });
    }
  );
};

export const removeChor = (app: Router): Router => {
  return app.delete(
    "/chor",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = chorIdValidationSchema.validate(req.body);

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

      const deletedChor = await deleteChor(value.id);

      if (deletedChor) {
        return res.status(204).json();
      }

      return res.status(500).json({ chorDeleted: false });
    }
  );
};

export const allListsChors = (app: Router): Router => {
  return app.get(
    "/chors/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = chorIdValidationSchema.validate(req.params);

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
      const chors = await getAllListsChors(value.id);

      res.status(chors ? 200 : 500).json({ chors });
    }
  );
};

export const updateOneChor = (app: Router): Router => {
  return app.put(
    "/chor",
    async (req: Request, res: Response, next: NextFunction) => {
      const { value, error } = updateChorValidationSchema.validate(req.body);

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

      const updatedChor = await updateChor(
        value.id,
        value?.name,
        value?.until,
        value?.done,
        value?.alertBeforeHours
      );

      res.status(updatedChor ? 200 : 500).json({ updatedChor });
    }
  );
};
