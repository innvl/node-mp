import { Express } from 'express';
import { usersRouter, groupsRouter, userGroupsRouter, authRouter } from '.';
import { authMiddleware } from '../middlewares';

export const initRoutes = (app: Express): void => {
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/groups', authMiddleware, groupsRouter);
    app.use('/user-groups', authMiddleware, userGroupsRouter);
};
