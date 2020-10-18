import { IGroup, Groups } from '../models/group';

class GroupsRepository {
    async getAll(): Promise<IGroup[]> {
        return await Groups.findAll();
    }

    async getById(id: string): Promise<IGroup | null> {
        const group = await Groups.findByPk(id);
        if (!group?.id) {
            throw new Error('Group not exsist');
        } else {
            return group;
        }
    }

    async update(group: IGroup): Promise<[number, Groups[]]> {
        return await Groups.update(
            { ...group },
            { where: { id: group.id } }
        );
    }

    async create(group: Groups): Promise<IGroup> {
        return await Groups.create({ ...group });
    }

    async remove(id: string): Promise<number> {
        return await Groups.destroy({
            where: {
                id
            },
            cascade: true
        });
    }
}


export const groupsRepository = new GroupsRepository();
