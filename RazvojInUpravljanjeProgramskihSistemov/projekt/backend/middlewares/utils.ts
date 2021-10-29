import { Request } from 'express';

export const getAllRequestParameters = (req: Request): Record<string, unknown> => {
    return Object.assign({}, req.params, req.body, req.query);
};
