import jwt from 'jsonwebtoken';

import { User, UserToken } from './interfaces';
import { camelCaseTransform } from '../../utils/camellize';
import { DbConstants } from '../../constants';
import { getPool } from '../../db/pool';
import { JwtTokenPayload } from '../../interfaces/jwtToken';
//import { setRedisKey } from '../../utils/redis';

export const createUserToken = async (jwtTokenPayload: JwtTokenPayload): Promise<UserToken | null> => {
    if (!jwtTokenPayload) {
        return null;
    }

    const user: User = camelCaseTransform(jwtTokenPayload);
    const userData = {
        userId: user.userId,
        role: user.role,
        exp: Number(user.exp),
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET, {
        audience: 'postgraphile',
    });

    let refreshToken: string;

    const client = await getPool().connect();
    try {
        const alreadyExistingRefreshTokenResponse = await client.query(
            'select refresh_token from sistemi_private.refresh_tokens where user_id = $1',
            [userData.userId],
        );
        refreshToken = alreadyExistingRefreshTokenResponse?.rows?.[0]?.refresh_token;

        if (!refreshToken) {
            refreshToken = jwt.sign({ validToken: true, userId: userData.userId }, process.env.JWT_REFRESH_SECRET, {
                audience: 'postgraphile',
            });
            await client.query(DbConstants.BEGIN);
            await client.query(
                'insert into sistemi_private.refresh_tokens(refresh_token, user_payload, user_id) values($1, $2, $3)',
                [refreshToken, jwtTokenPayload, userData.userId],
            );
            await client.query(DbConstants.COMMIT);
        }
    } catch (error) {
        await client.query(DbConstants.ROLLBACK);
        return null;
    } finally {
        client.release();
    }

    return {
        token,
        id: userData.userId,
        refreshToken,
    } as UserToken;
};

// const a = async () => {
//     const userToken = await createUserToken({
//         user_id: '75b52d2c-8262-45a9-91b3-e13ecabfbba0',
//         role: 'sistemi_user',
//         exp: '1635726234',
//     });
//     console.log({ userToken });
//     await setRedisKey(userToken.token, userToken.id);
// };
// a();
