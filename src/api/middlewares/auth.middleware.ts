import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../../config';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.accessTokenSecret, (error: unknown) => {
            if (error) {
                res.status(403).send('Forbidden');
            }
            next();
        });
    } else {
        res.status(401).send('Unauthorized');
    }
};

