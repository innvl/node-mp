import { Request, Response } from 'express';
import { groupsRepository } from '../data-access';

export const getAllGrops = async (req: Request, res: Response): Promise<void> => {
    try {
        const groups = await groupsRepository.getAll();
        res.status(200).send(groups);
    } catch (e) {
        res.status(400).send(e?.message);
    }
};

export const getGroupById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.groupId;
        const group = await groupsRepository.getById(id);
        res.status(200).send(group);
    } catch (e) {
        res.status(400).send(e?.message);
    }
};

export const createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const group = await groupsRepository.create({
            ...req.body
        });
        res.status(201).send(group.id);
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot create group');
    }
};

export const updateGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.groupId;
        await groupsRepository.update({ id, ...req.body });
        res.status(200).send('Ok');
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot Update group');
    }
};

export const removeGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.groupId;
        await groupsRepository.remove(id);
        res.status(200).send('Ok');
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot Remove');
    }
};
