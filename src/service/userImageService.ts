import { Transaction } from 'sequelize'

import UserImage from '../models/UserImage'
import { TUserImage } from '../types/type'

const create = (params: Omit<TUserImage, 'id'>, transaction: Transaction):Promise<UserImage> => 
    UserImage.create(params, { transaction })

const findPaginated = (params: Partial<TUserImage>, transaction: Transaction) => UserImage.findAndCountAll({
    where: {...params},
    order: [
        ['id', 'DESC']
    ],
    limit: 5,
    offset: 0, 
    transaction
})

const findByParams = (params: Partial<TUserImage>, transaction: Transaction) => UserImage.findAll({where: {...params}, transaction})

const findOneByParams = (params: Partial<TUserImage>, transaction: Transaction) => UserImage.findOne({where: {...params}, raw: true, transaction})

const userImageService = {
    create,
    findPaginated,
    findByParams,
    findOneByParams
}

export default userImageService