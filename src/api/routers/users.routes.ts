import { Router } from 'express';
import * as usersController from '../controllers';
import { userBodyValidation, paramsValidation, paramsValidationForGetSuggestedUsers } from '../validation';

export const usersRouter = Router();

usersRouter.post('/', userBodyValidation, usersController.create);
usersRouter.put('/:userId', userBodyValidation, usersController.update);
usersRouter.get('/:userId', paramsValidation, usersController.getById);
usersRouter.delete('/:userId', paramsValidation, usersController.remove);
usersRouter.get('/:loginSubStr/:limit', paramsValidationForGetSuggestedUsers, usersController.getAutoSuggestUsers);
