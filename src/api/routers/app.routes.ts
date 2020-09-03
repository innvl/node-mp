import { Express } from 'express';
import { usersRouter } from '.';

export const initRoutes = (app: Express): void => {
    app.use('/users', usersRouter);
};
