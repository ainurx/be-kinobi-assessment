import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '../common/database'
import User from './User';

class UserImage extends Model<InferAttributes<UserImage>, InferCreationAttributes<UserImage>>{
    declare id: number | null;
    declare userId: number;
    declare image: string;
}

UserImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        underscored: true,
        timestamps: false
    }
)

export default UserImage