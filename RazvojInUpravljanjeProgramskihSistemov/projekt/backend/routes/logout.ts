import { Router, NextFunction, Request, Response } from 'express';

import { Errors } from '../middlewares/passport/error';
import { ErrorHandler } from '../errorHandler/errorHandler';
import { ResponseMessage } from '../constants';
import { ErrorNames } from '../errorHandler/errors';
import { deleteRedisKey } from '../utils/redis';

export const logout = (app: Router): void => {
    app.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
        const { authorization: token } = req.headers;

        if (!token) {
            return next(new ErrorHandler(400, Errors.NO_TOKEN, ErrorNames.TOKEN_ERROR));
        }
        try {
            const loggedOut = await deleteRedisKey(token);

            res.status(loggedOut ? 200 : 500).send({
                message: loggedOut ? ResponseMessage.LOGGED_OUT : ResponseMessage.LOG_OUT_ERROR,
            });
        } catch (error) {
            next(
                new ErrorHandler(
                    400,
                    error.message ? error.message : Errors.LOGOUT_ERROR,
                    error.name ? error.name : ErrorNames.LOGOUT_ERROR,
                ),
            );
        }
    });
};
