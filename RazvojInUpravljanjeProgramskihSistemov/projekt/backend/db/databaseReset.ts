import path from 'path';
import { PoolClient } from 'pg';
import glob from 'glob';
import fs from 'fs';

import { ErrorHandler } from '../errorHandler/errorHandler';
import { getPool } from '../db/pool';
import { ErrorNames } from '../errorHandler/errors';

// Default value for resetting database from dist folder
const pathToPostgresFolder = '../postgres';

const getAllSqlFiles = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        glob('**/*.sql', { cwd: path.join(__dirname, pathToPostgresFolder) }, (err, files) => {
            if (err) {
                reject(new ErrorHandler(400, err.message, ErrorNames.GLOB_ERROR));
            }

            if (files && files.length === 0) {
                reject(new ErrorHandler(400, 'No .sql files found', ErrorNames.SQL));
            }

            resolve(files.sort()); // sort so that permissions are later than migrations
        });
    });
};

const readSqlFileContent = (filePath: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, sqlQuery) => {
            if (err) {
                reject(err);
            } else {
                resolve(sqlQuery);
            }
        });
    });
};

const databaseSetup = async () => {
    let client: PoolClient;
    let successfulDatabaseSetup = true;

    try {
        const sqlFiles: string[] = await getAllSqlFiles();
        sqlFiles.sort((a, b) => (a > b ? 1 : -1));

        client = await getPool().connect();
        if (process.argv[process.argv.length - 1] !== 'migrate') {
            console.log('Resetting database');
            await client.query(
                'DROP SCHEMA IF EXISTS sistemi_public CASCADE; DROP SCHEMA IF EXISTS sistemi_private CASCADE;',
            );
        } else {
            console.log('Migrating database.');
        }

        for (let index = 0; index < sqlFiles.length; index++) {
            const sqlPath = sqlFiles[index];

            const currentSqlPath = path.join(__dirname, pathToPostgresFolder, sqlPath);
            console.log(`Currently executing script: ${currentSqlPath}`);

            const query: string = await readSqlFileContent(currentSqlPath);

            await client.query(query);
        }
    } catch (err) {
        successfulDatabaseSetup = false;
        console.log(err);
    } finally {
        if (successfulDatabaseSetup) {
            console.log('Database set up successfully.');
        } else {
            console.log('Database set up was not successful.');
        }
        client.release();
    }
};

databaseSetup();
