import { Request, Response } from 'express';
import { usersRepository } from '../data-access/users.repository';

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.userId;
        const user = await usersRepository.getById(id);
        if (user && !user.isDeleted) {
            res.status(200).send(user);
        } else {
            res.status(404).send('User Not Found');
        }
    } catch {
        res.status(400).send('Cannot get user');
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await usersRepository.create({
            ...req.body,
            isDeleted: false
        });
        res.status(201).send(user.id);
    } catch {
        res.status(400).send('Cannot create user');
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.userId;
        await usersRepository.update({ id, ...req.body });
        res.status(200).send('Ok');
    } catch (e) {
        res.status(400).send(e);
    }
};

export const getAutoSuggestUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const loginSubStr = req.params?.loginSubStr;
        const limit = +req.params?.limit;
        const users = await usersRepository.getUsersBySearchString(loginSubStr, limit);

        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.userId;
        await usersRepository.remove(id);
        res.status(200).send('Ok');
    } catch (e) {
        res.status(400).send(e);
    }
};
