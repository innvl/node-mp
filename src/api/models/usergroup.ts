import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../db';
import { Users, Groups } from '.';

export interface IUserGroup {
    userId: string;
    groupId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AssignUsersToGroupDTO {
    groupId: string;
    usersIds: string[];
}

export class UserGroups extends Model<IUserGroup, IUserGroup> implements IUserGroup {
    public userId!: string;
    public groupId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserGroups.init({
    userId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    groupId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    modelName: 'UserGroups',
    sequelize
});

Users.belongsToMany(Groups, {
    through: 'UserGroups',
    as: 'groups',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true
});

Groups.belongsToMany(Users, {
    through: 'UserGroups',
    as: 'users',
    foreignKey: 'groupId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true
});
