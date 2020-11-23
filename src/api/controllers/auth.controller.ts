import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import config from '../../config';
import { usersRepository } from '../data-access';

export const login = async (req: Request, res: Response): Promise<void> => {
    const userLogin = req.body.login;
    const password = req.body.password;
    const user = await usersRepository.getByUserLogin(userLogin);
    if (!user) {
        res.status(400).send('User is not found!');
    } else {
        console.log(user.password);
        const validPass = await bcrypt.compare(password, user?.password);
        if (!validPass) {
            res.status(400).send('Invalid password');
        } else {
            const accessToken = jwt.sign({ login: user.login }, config.accessTokenSecret);
            res.status(200).send(accessToken);
        }
    }
};
