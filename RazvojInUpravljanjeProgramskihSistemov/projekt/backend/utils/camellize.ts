import { camelCase } from 'lodash';

// https://stackoverflow.com/a/50620653
/* eslint-disable  @typescript-eslint/no-explicit-any */
export const camelCaseTransform = <T>(obj: T): any => {
    if (obj instanceof Array) {
        return obj.map((v: T) => camelCaseTransform(v)) as any;
    } else if (obj !== null && obj instanceof Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelCase(key)]: camelCaseTransform(obj[key as keyof T]),
            }),
            {},
        ) as T;
    }
    return obj;
};
