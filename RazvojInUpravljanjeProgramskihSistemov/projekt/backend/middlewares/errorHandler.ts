import { Express, Request, Response, NextFunction } from 'express';

import { ErrorHandler } from '../interfaces/errorHandler';

export const standardErrorHandling = (app: Express): void => {
    app.use((error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        if (!error) {
            return next();
        }

        res.status(error.status || 500).json({ error });
    });
};
