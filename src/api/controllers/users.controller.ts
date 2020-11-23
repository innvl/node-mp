import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { usersRepository } from '../data-access/users.repository';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await usersRepository.getUsers();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e?.message);
    }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.userId;
        const user = await usersRepository.getById(id);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e?.message);
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const user = await usersRepository.create({
            ...req.body,
            password,
            isDeleted: false
        });
        res.status(201).send(user.id);
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot create user');
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.userId;
        await usersRepository.update({ id, ...req.body });
        res.status(200).send('Ok');
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot Update User');
    }
};

export const getAutoSuggestUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const loginSubStr = req.params?.loginSubStr;
        const limit = +req.params?.limit;
        const users = await usersRepository.getUsersBySearchString(loginSubStr, limit);

        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot Find Users');
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params?.userId;
        await usersRepository.remove(id);
        res.status(200).send('Ok');
    } catch (e) {
        res.status(400).send(e?.message || 'Cannot Remove');
    }
};
