import { Op } from 'sequelize';
import { Groups, IGroup, AssignUsersToGroupDTO, UserGroups } from '../models';
import { sequelize } from '../db';

class UserGroupsRepository {
    async assignUsersToGroup(usersToGroup: AssignUsersToGroupDTO): Promise<UserGroups[]> {
        return sequelize.transaction((t) => {
            return Promise.all(usersToGroup.usersIds.map((userId) => (
                UserGroups.create({ groupId: usersToGroup.groupId, userId }, { transaction: t })
            )));
        });
    }

    async getUsersByGroup(groupId: string): Promise<IGroup[] | null> {
        return await Groups.findAll(
            {
                include: 'users',
                where: {
                    id: {
                        [Op.eq]: groupId
                    }

                }
            },
        );
    }
}

export const userGroupsRepository = new UserGroupsRepository();
