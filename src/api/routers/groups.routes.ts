import { Router } from 'express';
import { groupsParamsValidation, groupCreationValidation } from '../validation';
import { getAllGrops, getGroupById, createGroup, removeGroup, updateGroup } from '../controllers';

export const groupsRouter = Router();

groupsRouter.get('/', getAllGrops);
groupsRouter.get('/:groupId', groupsParamsValidation, getGroupById);
groupsRouter.post('/', groupCreationValidation, createGroup);
groupsRouter.put('/:groupId', groupsParamsValidation, updateGroup);
groupsRouter.delete('/:groupId', groupsParamsValidation, removeGroup);
