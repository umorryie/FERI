import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as passport from 'passport';

import { setRoutes } from './routes';
import { standardErrorHandling } from './middlewares/errorHandler';
import { postgraphileMiddleware } from './middlewares/postgraphile';
import {
    googleAndroidOAuth,
    googleIosOAuth,
    googleWebOAuth,
    facebookAndroidOAuth,
    facebookIosOAuth,
    facebookWebOAuth,
    appleAndroidOAuth,
    appleIosOAuth,
    appleWebOAuth,
    tokenAuthStrategy,
    authenticate,
} from './middlewares/passport/passport';

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

/* initialize passport */
const pass = new passport.Passport();

// define how passport (de)serialization should work
pass.serializeUser(function (user, done) {
    done(null, user);
});
pass.deserializeUser(function (user, done) {
    done(null, user);
});

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(pass.initialize());
app.use(pass.session());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
tokenAuthStrategy();
googleAndroidOAuth();
googleIosOAuth();
googleWebOAuth();
facebookAndroidOAuth();
facebookIosOAuth();
facebookWebOAuth();
appleAndroidOAuth();
appleIosOAuth();
appleWebOAuth();

const apiRouter = express.Router();
authenticate(apiRouter); // authenticate v1 requests
setRoutes(apiRouter);
app.use(process.env.URL_PREFIX, apiRouter);

postgraphileMiddleware(app);
standardErrorHandling(app);
export default app;
