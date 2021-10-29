import passport, { PassportStatic } from 'passport';
import AuthTokenStrategy from 'passport-auth-token';
import { Strategy as customStrategy } from 'passport-custom';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import PassportFacebookToken from 'passport-facebook-token';
import { NextFunction, Response, Request, Router } from 'express';
import verifyAppleToken from 'verify-apple-id-token';

import { createUserToken } from './utils';
import { Errors } from './error';
import { setRedisKey, getRedisValue } from '../../utils/redis';
import { SocialUser } from '../../services/users/socialUser/socialUser';
import { SocialMediaProvider } from '../../constants';
import { UserToken, FacebookPayload } from './interfaces';
import { validateRequestParameters } from '../validateSchema';
import { socialMediaRegistrationSchema } from '../../validations/schemas/registerUser';
import { ErrorNames } from '../../errorHandler/errors';
import { ErrorHandler } from '../../errorHandler/errorHandler';

export const saveUserAndGetSocialMediaUserToken = async (
    payload: TokenPayload | FacebookPayload,
): Promise<UserToken> => {
    const { sub: profileId, email } = payload;
    const user = new SocialUser(profileId, email ? email : '');
    const cur = await user.save();
    const jwtTokenPayload = cur?.rows?.[0]?.user_id ? cur.rows[0] : null;

    const userToken = await createUserToken(jwtTokenPayload);

    if (userToken) {
        const userSet = await setRedisKey(userToken.token, userToken.id);
        if (!userSet) {
            return null;
        }
    }
    return userToken;
};

export const appleOAuth = (providerName: string): customStrategy => {
    let clientId = '';

    switch (providerName) {
        case SocialMediaProvider.IOS: {
            clientId = process.env.APPLE_IOS_CLIENT_ID;
            break;
        }
        case SocialMediaProvider.ANDROID: {
            clientId = process.env.APPLE_ANDROID_CLIENT_ID;
            break;
        }
        default: {
            clientId = process.env.APPLE_WEB_CLIENT_ID;
            break;
        }
    }
    return new customStrategy(async (req, cb) => {
        const { id_token } = req.body;

        try {
            const jwtClaims = await verifyAppleToken({
                idToken: id_token,
                clientId,
            });

            const payload = {
                sub: jwtClaims.sub,
                email: jwtClaims.email || '',
            };
            const userToken = await saveUserAndGetSocialMediaUserToken(payload);

            if (userToken) {
                return cb(null, userToken);
            }

            return cb(new ErrorHandler(400, Errors.NO_SUCH_USER, ErrorNames.APPLE), false);
        } catch (error) {
            return cb(new ErrorHandler(503, Errors.SIGN_IN, ErrorNames.APPLE), null);
        }
    });
};

export const facebookOAuth = (): PassportFacebookToken.StrategyInstance => {
    const clientId: string = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret: string = process.env.FACEBOOK_CLIENT_SECRET;

    return new PassportFacebookToken(
        {
            clientID: clientId,
            clientSecret: clientSecret,
            fbGraphVersion: 'v3.0',
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const payload = {
                    email: profile?.emails?.[0]?.value,
                    sub: profile.id,
                };

                const userToken = await saveUserAndGetSocialMediaUserToken(payload);

                if (userToken) {
                    return cb(null, userToken);
                }

                return cb(new ErrorHandler(400, Errors.NO_SUCH_USER, ErrorNames.FACEBOOK), false);
            } catch (error) {
                return cb(new ErrorHandler(503, Errors.SIGN_IN, ErrorNames.FACEBOOK), null);
            }
        },
    );
};

const googleOAuth = (providerName: string): customStrategy => {
    let clientId = '';

    switch (providerName) {
        case SocialMediaProvider.IOS: {
            clientId = process.env.GOOGLE_IOS_CLIENT_ID;
            break;
        }
        case SocialMediaProvider.ANDROID: {
            clientId = process.env.GOOGLE_ANDROID_CLIENT_ID;
            break;
        }
        default: {
            clientId = process.env.GOOGLE_WEB_CLIENT_ID;
            break;
        }
    }

    return new customStrategy(async (req, cb) => {
        const { access_token } = req.body;

        const client = new OAuth2Client(clientId);

        try {
            const ticket = await client.verifyIdToken({
                idToken: access_token,
                audience: clientId,
            });
            const payload = ticket.getPayload();
            const userToken = await saveUserAndGetSocialMediaUserToken(payload);

            if (userToken) {
                return cb(null, userToken);
            }

            return cb(new ErrorHandler(400, Errors.NO_SUCH_USER, ErrorNames.GOOGLE), false);
        } catch (error) {
            return cb(new ErrorHandler(503, Errors.SIGN_IN, ErrorNames.GOOGLE), null);
        }
    });
};

export const tokenAuthStrategy = (): PassportStatic => {
    return passport.use(
        new AuthTokenStrategy({ headerFields: ['authorization'], caseInsensitive: true }, async (token, done) => {
            const userId = await getRedisValue(token);
            if (userId) {
                return done(null, { id: userId });
            }
            return done(
                {
                    error: Errors.CREDENTIALS_MISSING_INVALID,
                },
                false,
            );
        }),
    );
};

// google / facebook / apple passport auth
export const socialAuthentication = (req: Request, res: Response, next: NextFunction): void => {
    const { platform, provider } = req.params;
    const passportAuthenticateName = `${platform}-${provider}`;

    return passport.authenticate(passportAuthenticateName, {
        failureRedirect: '/login',
    })(req, res, next);
};

// social login validation schema
export const getSocialValidationSchema = (req: Request, res: Response, next: NextFunction): void => {
    const { platform } = req.params;

    return validateRequestParameters(socialMediaRegistrationSchema(platform))(req, res, next);
};

// login via google web auth sdk
export const googleWebOAuth = (): PassportStatic => {
    return passport.use('google-web', googleOAuth(SocialMediaProvider.WEB));
};

// login via google android auth sdk
export const googleAndroidOAuth = (): PassportStatic => {
    return passport.use('google-android', googleOAuth(SocialMediaProvider.ANDROID));
};

// login via google ios auth sdk
export const googleIosOAuth = (): PassportStatic => {
    return passport.use('google-ios', googleOAuth(SocialMediaProvider.IOS));
};

// login via facebook web auth sdk
export const facebookWebOAuth = (): PassportStatic => {
    return passport.use('facebook-web', facebookOAuth());
};

// login via facebook android auth sdk
export const facebookAndroidOAuth = (): PassportStatic => {
    return passport.use('facebook-android', facebookOAuth());
};

// login via facebook ios auth sdk
export const facebookIosOAuth = (): PassportStatic => {
    return passport.use('facebook-ios', facebookOAuth());
};

// login via apple web auth sdk
export const appleWebOAuth = (): PassportStatic => {
    return passport.use('apple-web', appleOAuth(SocialMediaProvider.WEB));
};

// login via apple android auth sdk
export const appleAndroidOAuth = (): PassportStatic => {
    return passport.use('apple-android', appleOAuth(SocialMediaProvider.ANDROID));
};

// login via apple ios auth sdk
export const appleIosOAuth = (): PassportStatic => {
    return passport.use('apple-ios', appleOAuth(SocialMediaProvider.IOS));
};

export const authenticate = (router: Router): void => {
    router.use(
        '/v1/*',
        (req, res, next) => {
            if (req.method === 'OPTIONS') return next();

            passport.authenticate(
                'authtoken',
                {
                    session: false,
                },
                (error, user, info) => {
                    if (error) {
                        res.status(401).send(error);
                    } else if (!user) {
                        res.status(401).send(info);
                    } else {
                        req.user = {
                            id: user.id,
                        }; /* set the id if the user for postgraphile */
                        next();
                    }
                },
            )(req, res);
        },
        (req, res, next) => {
            next();
        },
    );
};
