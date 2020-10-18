import { Router } from 'express';
import * as userGroupsController from '../controllers';
import { usersToGroupCreatioinValidation } from '../validation';

export const userGroupsRouter = Router();

userGroupsRouter.post('/assign-users', usersToGroupCreatioinValidation, userGroupsController.assignUsersToGroup);
userGroupsRouter.get('/users/:groupId', userGroupsController.getUsersByGroup);
