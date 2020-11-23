import { Optional, Model, DataTypes, UUIDV4 } from 'sequelize';
import { sequelize } from '../db';

export interface IUser {
    id?: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttributes = Optional<IUser, 'id'>

export class Users extends Model<IUser, UserCreationAttributes> implements IUser {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        modelName: 'Users',
        sequelize
    }
);
