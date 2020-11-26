import { Request, Response } from 'express';

import { usersRepository } from '../data-access/users.repository';
import { mockResponse, mockRequest } from '../utils/testing';
import { IUser } from '../models';

import {
    create,
    getAllUsers,
    getById,
    update,
    remove,
    getAutoSuggestUsers
} from './users.controller';

const mockUsers: IUser[] = [
    {
        id: 'id-1',
        login: 'l1@m.c',
        password: 'pass',
        age: 1,
        isDeleted: false
    },
    {
        id: 'id-2',
        login: 'l2@m.c',
        password: 'pass',
        age: 2,
        isDeleted: false
    }
];

const errorMsg = { message: 'Error' };

describe('Users Controller :: ', () => {
    describe('getAllUsers :: ', () => {
        let req: Request;
        let res: Response<any>;

        beforeEach(() => {
            req = mockRequest();
            res = mockResponse();
        });

        it('Should response with a list of users', async () => {
            usersRepository.getUsers = jest.fn().mockReturnValue(Promise.resolve(mockUsers));

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockUsers);
        });

        it('Should response with error if any', async () => {
            usersRepository.getUsers = jest.fn().mockReturnValue(Promise.reject(errorMsg));

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(errorMsg.message);
        });
    });

    describe('getById :: ', () => {
        it('Should response with user', async () => {
            usersRepository.getById = jest.fn().mockReturnValue(Promise.resolve(mockUsers[0]));
            const res = mockResponse();
            const req = mockRequest({ userId: mockUsers[0].id });

            await getById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockUsers[0]);
        });

        it('Should response with error if any', async () => {
            usersRepository.getById = jest.fn().mockReturnValue(Promise.reject(errorMsg));
            const res = mockResponse();
            const req = mockRequest({ userId: mockUsers[1].id });

            await getById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(errorMsg.message);
        });
    });

    describe('create :: ', () => {
        const reqBody = {
            login: mockUsers[0].login,
            password: mockUsers[0].password,
            age: mockUsers[0].age
        };
        let req: Request;
        let res: Response<any>;

        beforeEach(async () => {
            req = mockRequest(
                undefined,
                reqBody
            );
            res = mockResponse();
        });

        it('Should Create an User and response with user id', async () => {
            usersRepository.create = jest.fn().mockReturnValue(Promise.resolve(mockUsers[0]));

            await create(req, res);

            expect(res.send).toHaveBeenCalledWith(mockUsers[0].id);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('Should save with crypted user password', async () => {
            usersRepository.create = jest.fn().mockReturnValue(Promise.resolve(mockUsers[0]));

            await create(req, res);

            expect(usersRepository.create)
                .not.toHaveBeenCalledWith({
                    ...reqBody,
                    isDeleted: false
                });
        });

        it('Should response with an error if any', async () => {
            usersRepository.create = jest.fn().mockRejectedValue(errorMsg);
            await await await create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('update :: ', () => {
        it('Should update user info', async () => {
            const reqBody = mockUsers[0];
            usersRepository.update = jest.fn();
            const req = mockRequest(
                {
                    userId: mockUsers[0].id
                },
                reqBody
            );
            const res = mockResponse();

            await update(req, res);

            expect(usersRepository.update).toHaveBeenCalledWith(reqBody);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('Should response with error if any', async () => {
            usersRepository.update = jest.fn().mockReturnValue(Promise.reject(errorMsg));
            const req = mockRequest();
            const res = mockResponse();

            await update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(errorMsg.message);
        });
    });

    describe('getAutoSuggestUsers :: ', () => {
        it('Should response with filtered list of users', async () => {
            usersRepository.getUsersBySearchString = jest.fn().mockReturnValue(mockUsers);

            const req = mockRequest(
                {
                    limit: 10,
                    loginSubStr: 'l'
                }
            );
            const res = mockResponse();

            await getAutoSuggestUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockUsers);
        });


        it('Should response with error if any', async () => {
            usersRepository.getUsersBySearchString = jest.fn().mockReturnValue(Promise.reject(errorMsg));
            const req = mockRequest();
            const res = mockResponse();

            await getAutoSuggestUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(errorMsg.message);
        });
    });

    describe('remove :: ', () => {
        it('Should remove user', async () => {
            usersRepository.remove = jest.fn();
            const req = mockRequest({
                userId: mockUsers[0].id
            });
            const res = mockResponse();

            await remove(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('Should response with error if any', async () => {
            usersRepository.remove = jest.fn().mockReturnValue(Promise.reject(errorMsg));
            const req = mockRequest({
                userId: mockUsers[0].id
            });
            const res = mockResponse();

            await remove(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(errorMsg.message);
        });
    });
});
