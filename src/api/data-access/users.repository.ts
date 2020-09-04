import { Op } from 'sequelize';
import { Users, IUser } from '../models';

class UsersRepository {
    async getUsers(): Promise<IUser[]> {
        return await Users.findAll();
    }

    async getById(id: string): Promise<IUser | null> {
        const user = await Users.findByPk(id);
        if (!user?.id || user?.isDeleted) {
            throw new Error('User not exsist');
        } else {
            return user;
        }
    }

    async update(user: Users): Promise<IUser> {
        return await user.update(
            { ...user },
            { where: { id: user.id } }
        );
    }

    async create(user: Users): Promise<IUser> {
        return await Users.create({ ...user });
    }

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

    async remove(id: string): Promise<number> {
        return await Users.destroy({
            where: {
                id
            }
        });
    }
}

export const usersRepository = new UsersRepository();
