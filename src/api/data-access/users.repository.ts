import { Op } from 'sequelize';
import { Users, IUser } from '../models';
import { logRequest } from '../utils/decorators';

class UsersRepository {
    @logRequest()
    async getUsers(): Promise<IUser[]> {
        return await Users.findAll();
    }

    @logRequest()
    async getById(id: string): Promise<IUser | null> {
        const user = await Users.findByPk(id);
        if (!user?.id || user?.isDeleted) {
            throw new Error('User not exsist');
        } else {
            return user;
        }
    }

    @logRequest()
    async update(user: IUser): Promise<[number, Users[]]> {
        return await Users.update(
            { ...user },
            { where: { id: user.id } }
        );
    }

    @logRequest()
    async create(user: Users): Promise<IUser> {
        return await Users.create({ ...user });
    }

    @logRequest()
    async getUsersBySearchString(searchStr = '', limit = 0): Promise<IUser[]> {
        return await Users.findAll({
            where: {
                login: {
                    [Op.like]: `${searchStr}%`
                }

            },
            limit
        });
    }

    @logRequest()
    async remove(id: string): Promise<number> {
        return await Users.destroy({
            where: {
                id
            }
        });
    }
}

export const usersRepository = new UsersRepository();
