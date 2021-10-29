import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: `${process.env.PWD}/.env` });
let pool: Pool | undefined;

export const getPool = (): Pool => {
    if (pool) {
        return pool;
    }
    const connectionString = process.env.DB_CONNECT;

    pool = new Pool({ connectionString });
    return pool;
};
