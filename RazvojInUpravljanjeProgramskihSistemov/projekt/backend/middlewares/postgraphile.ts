import { postgraphile } from 'postgraphile';
import express, { Router } from 'express';
import PgManyToManyPlugin from '@graphile-contrib/pg-many-to-many';
import dotenv from 'dotenv';

import { User } from '../interfaces/user';

dotenv.config({ path: `${process.env.PWD}/.env` });
const poolConfig = process.env.DB_CONNECT;

export const postgraphileMiddleware = (app: Router): express.Router => {
    return app.use(
        postgraphile(poolConfig, process.env.DB_SCHEMA, {
            appendPlugins: [PgManyToManyPlugin],
            externalGraphqlRoute: process.env.EXTERNAL_GRAPHQL_ENDPOINT,
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: true,
            graphqlRoute: process.env.GRAPHQL_ENDPOINT,
            graphiqlRoute: '/api/graphiql',
            disableDefaultMutations: false,
            pgSettings: async (req: express.Request) => {
                /* dynamically set the role based on the currently authenticated user */
                let role = process.env.DB_DEFAULT_ROLE;
                const user = req.user as User;
                if (user) {
                    role = process.env.DB_USER_ROLE;
                }
                return {
                    'jwt.claims.user_id': user.id,
                    role,
                };
            },
        }),
    );
};
