import { Router, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { getPool } from '../db/pool';
import { Errors } from '../middlewares/passport/error';
import { validateRequestParameters } from '../middlewares/validateSchema';
import { refreshTokenSchema } from '../validations/schemas/refreshToken';
import { ErrorHandler } from '../errorHandler/errorHandler';
import { ErrorNames } from '../errorHandler/errors';
import { createUserToken } from '../middlewares/passport/utils';
import { setRedisKey } from '../utils/redis';

export const refreshToken = (app: Router): void => {
    app.post(
        '/refresh-token',
        validateRequestParameters(refreshTokenSchema),
        async (req: Request, res: Response, next: NextFunction) => {
            let decodedToken;
            const { refreshToken } = req.body;
            const client = await getPool().connect();

            try {
                decodedToken = JSON.parse(JSON.stringify(jwt.decode(refreshToken.toString())));
            } catch (err) {
                return next(new ErrorHandler(400, Errors.PARSING_ERROR, ErrorNames.JSON_PARSE));
            }

            // We check if refresh token was successfully decoded and also we check if it has our property that we set it on creation
            if (!decodedToken || !decodedToken.validToken || decodedToken.validToken !== true || !decodedToken.userId) {
                return next(new ErrorHandler(400, Errors.INVALID_REFRESH_TOKEN, ErrorNames.TOKEN_ERROR));
            }

            try {
                const tokenSqlResponse = await client.query(
                    'select * from blare_private.refresh_tokens where refresh_token = $1',
                    [refreshToken],
                );
                const refreshTokenExists = tokenSqlResponse?.rows?.[0]?.refresh_token;

                if (refreshTokenExists) {
                    await client.query('delete from blare_private.refresh_tokens where refresh_token = $1', [
                        refreshToken,
                    ]);
                    const jwtTokenPayload = tokenSqlResponse?.rows?.[0]?.user_id
                        ? tokenSqlResponse.rows[0].user_payload
                        : null;
                    const userToken = await createUserToken(jwtTokenPayload);
                    if (userToken) {
                        const userSet = await setRedisKey(userToken.token, userToken.id);
                        if (!userSet) {
                            return null;
                        }
                    }
                    return res.send(userToken);
                }
                next(new ErrorHandler(400, Errors.INVALID_REFRESH_TOKEN, ErrorNames.TOKEN_ERROR));
            } catch (error) {
                next(new ErrorHandler(500, Errors.INTERNAL_ERROR, ErrorNames.INTERNAL_ERROR));
            } finally {
                client.release();
            }
        },
    );
};
