import { Router, Request, Response } from 'express';

import { socialAuthentication, getSocialValidationSchema } from '../middlewares/passport/passport';

export const socialMediaSdk = (app: Router): Router => {
    return app.post(
        '/auth/:platform/:provider',
        getSocialValidationSchema,
        socialAuthentication,
        (req: Request, res: Response) => {
            res.send(req.user);
        },
    );
};
