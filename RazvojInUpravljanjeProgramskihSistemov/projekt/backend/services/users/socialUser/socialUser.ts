import { PoolClient, QueryResult } from 'pg';

import { DbConstants } from '../../../constants';
import { getPool } from '../../../db/pool';
import { UserService } from '../interfaces/userService';

export class SocialUser implements UserService {
    private profileId: string;
    private email: string;
    public username: string;

    constructor(profileId: string, email: string) {
        this.profileId = profileId;
        this.email = email;
        this.username = '';
    }

    async save(): Promise<QueryResult> {
        const client: PoolClient = await getPool().connect();
        try {
            await client.query(DbConstants.BEGIN);
            const cur = await client.query('select * from sistemi_public.register_social_media_user($1, $2, $3)', [
                this.username,
                this.profileId,
                this.email,
            ]);
            await client.query(DbConstants.COMMIT);

            return cur;
        } catch (error) {
            await client.query(DbConstants.ROLLBACK);
            return null;
        } finally {
            client.release();
        }
    }
}
