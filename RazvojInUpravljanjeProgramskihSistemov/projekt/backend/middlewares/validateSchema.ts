import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { ErrorHandler } from '../errorHandler/errorHandler';
import { getAllRequestParameters } from './utils';

export const validateRequestParameters = (schema: joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(getAllRequestParameters(req));
        if (error) {
            throw new ErrorHandler(400, error.message, error.name);
        } else {
            next();
        }
    };
};
