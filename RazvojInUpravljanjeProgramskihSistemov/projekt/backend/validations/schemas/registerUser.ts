import Joi from 'joi';

import { SocialMediaProvider, SocialMediaPlatform } from '../../constants';

export const socialMediaRegistrationSchema = (platform: string): Joi.ObjectSchema => {
    if (platform === SocialMediaPlatform.APPLE) {
        return Joi.object({
            id_token: Joi.string().required(),
            provider: Joi.string()
                .required()
                .valid(SocialMediaProvider.ANDROID, SocialMediaProvider.IOS, SocialMediaProvider.WEB),
            platform: Joi.string().required().valid(SocialMediaPlatform.APPLE),
            code: Joi.string(),
        });
    }

    return Joi.object({
        access_token: Joi.string().required(),
        provider: Joi.string()
            .required()
            .valid(SocialMediaProvider.ANDROID, SocialMediaProvider.IOS, SocialMediaProvider.WEB),
        platform: Joi.string().required().valid(SocialMediaPlatform.FACEBOOK, SocialMediaPlatform.GOOGLE),
    });
};
