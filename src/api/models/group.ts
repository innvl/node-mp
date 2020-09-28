import { Optional, Model, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../db';

export type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';
export interface IGroup {
    id?: string;
    name: string;
    permissions: Permissions[];
    createdAt?: Date;
    updatedAt?: Date;
}

type GroupsCreationAttributes = Optional<IGroup, 'id'>

export class Group extends Model<IGroup, GroupsCreationAttributes> implements IGroup {
    public id!: string;
    public name!: string;
    public permissions!: Permissions[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Group.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },
    {
        modelName: 'Users',
        sequelize
    }
);
