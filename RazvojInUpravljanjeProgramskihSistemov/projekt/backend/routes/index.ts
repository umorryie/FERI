import { Router } from 'express';

import { logout } from './logout';
import { refreshToken } from './refreshToken';
import { socialMediaSdk } from './socialMediaSdk';

export const setRoutes = (app: Router): void => {
    refreshToken(app);
    logout(app);
    socialMediaSdk(app);
};
