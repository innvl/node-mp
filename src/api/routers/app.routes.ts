import { Express } from 'express';
import { usersRouter, groupsRouter, userGroupsRouter } from '.';

export const initRoutes = (app: Express): void => {
    app.use('/users', usersRouter);
    app.use('/groups', groupsRouter);
    app.use('/user-groups', userGroupsRouter);
};
