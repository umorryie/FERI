import { createNodeRedisClient } from 'handy-redis';

const redisUrl = process.env.REDIS_CONNECT;

export const getRedisValue = async (key: string): Promise<string> => {
    const redisCli = createNodeRedisClient({ url: redisUrl });
    try {
        return await redisCli.get(key);
    } catch (e) {
        return '';
    } finally {
        await redisCli.quit();
    }
};

export const setRedisKey = async (token: string, id: string): Promise<boolean> => {
    const redisCli = createNodeRedisClient({ url: redisUrl });
    try {
        await redisCli.set(token, id);
        return true;
    } catch (e) {
        return false;
    } finally {
        await redisCli.quit();
    }
};

export const deleteRedisKey = async (token: string): Promise<number> => {
    const redisCli = createNodeRedisClient({ url: redisUrl });
    try {
        return Number(await redisCli.del(token));
    } catch (e) {
        return null;
    } finally {
        await redisCli.quit();
    }
};
