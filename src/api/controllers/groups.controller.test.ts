import { IGroup } from '../models';
import { mockRequest, mockResponse } from '../utils/testing';
import { groupsRepository } from '../data-access';
import { getAllGrops, getGroupById, createGroup, updateGroup, removeGroup } from './groups.controller';

const mockGroups: IGroup[] = [{
    id: 'g-id-1',
    name: 'Test1',
    permissions: ['READ']
}];

const error = { message: 'Error' };

describe('Groups Controller', () => {
    describe('getAllGrops :: ', () => {
        it('Should response with all groups', async () => {
            groupsRepository.getAll = jest.fn().mockReturnValue(Promise.resolve(mockGroups));
            const req = mockRequest();
            const res = mockResponse();

            await getAllGrops(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockGroups);
        });

        it('Should response with an error if any', async () => {
            groupsRepository.getAll = jest.fn().mockReturnValue(Promise.reject(error));
            const req = mockRequest();
            const res = mockResponse();

            await getAllGrops(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(error.message);
        });
    });

    describe('getGroupById :: ', () => {
        it('Should get group by id', async () => {
            groupsRepository.getById = jest.fn().mockReturnValue(Promise.resolve(mockGroups[0]));
            const req = mockRequest(
                {
                    groupId: mockGroups[0].id
                });
            const res = mockResponse();

            await getGroupById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockGroups[0]);
        });

        it('Should response with an error if any', async () => {
            groupsRepository.getById = jest.fn().mockReturnValue(Promise.reject(error));
            const req = mockRequest();
            const res = mockResponse();

            await getGroupById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(error.message);
        });
    });

    describe('createGroup :: ', () => {
        it('Should create a group', async () => {
            groupsRepository.create = jest.fn().mockReturnValue(Promise.resolve(mockGroups[0]));
            const req = mockRequest(undefined,
                {
                    name: mockGroups[0].name,
                    permissions: mockGroups[0].permissions
                });
            const res = mockResponse();

            await createGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(mockGroups[0].id);
        });

        it('Should response with an error if any', async () => {
            groupsRepository.create = jest.fn().mockReturnValue(Promise.reject(error));
            const req = mockRequest();
            const res = mockResponse();

            await createGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(error.message);
        });
    });

    describe('updateGroup :: ', () => {
        it('Should  update group', async () => {
            groupsRepository.update = jest.fn().mockReturnValue(Promise.resolve(mockGroups[0]));
            const req = mockRequest(
                {
                    groupId: mockGroups[0].id
                },
                {
                    name: mockGroups[0].name,
                    permissions: mockGroups[0].permissions
                });
            const res = mockResponse();

            await updateGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('Should response with an error if any', async () => {
            groupsRepository.update = jest.fn().mockReturnValue(Promise.reject(error));
            const req = mockRequest();
            const res = mockResponse();

            await updateGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(error.message);
        });
    });

    describe('removeGroup :: ', () => {
        it('Should remove group by id', async () => {
            groupsRepository.remove = jest.fn();
            const req = mockRequest(
                {
                    groupId: mockGroups[0].id
                });
            const res = mockResponse();

            await removeGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('Should response with an error if any', async () => {
            groupsRepository.remove = jest.fn().mockReturnValue(Promise.reject(error));
            const req = mockRequest();
            const res = mockResponse();

            await removeGroup(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(error.message);
        });
    });
});
