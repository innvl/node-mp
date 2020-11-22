import { IGroup, Groups } from '../models/group';
import { logRequest } from '../utils/decorators';

export class GroupsRepository {
    @logRequest()
    async getAll(): Promise<IGroup[]> {
        return await Groups.findAll();
    }

    @logRequest()
    async getById(id: string): Promise<IGroup | null> {
        const group = await Groups.findByPk(id);
        if (!group?.id) {
            throw new Error('Group not exsist');
        } else {
            return group;
        }
    }

    @logRequest()
    async update(group: IGroup): Promise<[number, Groups[]]> {
        return await Groups.update(
            { ...group },
            { where: { id: group.id } }
        );
    }

    @logRequest()
    async create(group: Groups): Promise<IGroup> {
        return await Groups.create({ ...group });
    }

    @logRequest()
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
