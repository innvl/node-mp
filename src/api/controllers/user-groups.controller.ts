import { Request, Response } from 'express';
import { userGroupsRepository } from '../data-access';


export const assignUsersToGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        await userGroupsRepository.assignUsersToGroup({
            ...req.body
        });
        res.status(201).send('ok');
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot create users group');
    }
};

export const getUsersByGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const groupId = req.params?.groupId;
        const userGroups = await userGroupsRepository.getUsersByGroup(groupId);
        res.status(201).send(userGroups);
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot create users group');
    }
};
