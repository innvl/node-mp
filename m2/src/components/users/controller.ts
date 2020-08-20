import { Request, Response } from 'express';

import { uuid } from '../../services';

import { users } from './users.data';

const getById = (req: Request, res: Response): void => {
    const id = req.params?.userId;
    const user = users?.length && users.find((item) => item?.id === id);
    if (user && !user.isDeleted) {
        res.status(200).send(user);
    } else {
        res.status(404).send('User Not Found');
    }
};

const create = (req: Request, res: Response): void => {
    const user = {
        ...req.body,
        id: uuid(),
        isDeleted: false
    };
    users.push(user);
    res.status(201).send(user.id);
};

const update = (req: Request, res: Response): void => {
    const id = req.params?.userId;
    const userIndex = users?.length && users.findIndex((item) => item?.id === id);
    const changes = req.body;

    if (userIndex !== -1 && !users[userIndex]?.isDeleted) {
        users[userIndex] = { ...users[userIndex], ...changes };
        res.status(200).send(users[userIndex]);
    } else {
        res.status(404).send('User Not Found!');
    }
};

const getAutoSuggestUsers = (req: Request, res: Response): void => {
    const loginSubStr = req.params?.loginSubStr;
    const limit = +req.params?.limit;

    const suggestUsers = users?.length && users
        .filter((item) => item.login.includes(loginSubStr))
        .sort((a, b) => {
            if (a.login > b.login) {
                return 1;
            }
            if (a.login < b.login) {
                return -1;
            }
            return 0;
        })
        .slice(0, limit);
    if (suggestUsers !== 0 && suggestUsers?.length) {
        res.status(200).send(suggestUsers);
    } else {
        res.status(404).send('Users Not Found!');
    }
};

const remove = (req: Request, res: Response): void => {
    const id = req.params?.userId;
    const userIndex = users?.length && users.findIndex((item) => item?.id === id);

    if (userIndex !== -1 && !users[userIndex]?.isDeleted) {
        users[userIndex].isDeleted = true;
        res.status(200).send(users[userIndex]);
    } else {
        res.status(404).send('User Not Found!');
    }
};

export default {
    getById,
    create,
    update,
    getAutoSuggestUsers,
    remove
};

