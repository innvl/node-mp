import { Router } from 'express';
import usersController from './controller';
import { userBodyValidation, paramsValidation, paramsValidationForGetSuggestedUsers } from './validator';

const router = Router();

router.post('/', userBodyValidation, usersController.create);
router.put('/:userId', userBodyValidation, usersController.update);
router.get('/:userId', paramsValidation, usersController.getById);
router.delete('/:userId', paramsValidation, usersController.remove);
router.get('/:loginSubStr/:limit', paramsValidationForGetSuggestedUsers, usersController.getAutoSuggestUsers);

export default router;
