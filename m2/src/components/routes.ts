
import { Express } from 'express';
import userRoutes from './users/routes';

export const initRoutes = (app: Express): void => {
    app.use('/users', userRoutes);
};
