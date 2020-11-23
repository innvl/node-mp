import { Router } from 'express';
import * as usersController from '../controllers';
import { userBodyValidation, paramsValidation, paramsValidationForGetSuggestedUsers } from '../validation';
import { authMiddleware } from '../middlewares';

export const usersRouter = Router();

usersRouter.post('/', userBodyValidation, usersController.create);
usersRouter.put('/:userId', authMiddleware, userBodyValidation, usersController.update);
usersRouter.get('/:userId', authMiddleware, paramsValidation, usersController.getById);
usersRouter.get('/', authMiddleware, usersController.getAllUsers);
usersRouter.delete('/:userId', authMiddleware, paramsValidation, usersController.remove);
usersRouter.get('/:loginSubStr/:limit', authMiddleware, paramsValidationForGetSuggestedUsers, usersController.getAutoSuggestUsers);
