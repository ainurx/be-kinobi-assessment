import { Transaction } from 'sequelize'

import User from '../models/User'
import { TUser } from '../types/type'

const create = (params: Omit<TUser, 'id'>, transaction: Transaction) => User.create(params, { transaction })
const findById = (id: number, transaction?: Transaction) => User.findByPk(id, { raw: true, transaction })
const findByParams = (params: TUser, transaction: Transaction) => User.findAll({ where: {...params}, transaction })
const findOneByParams = (params: Partial<TUser>, transaction: Transaction) => User.findOne({ where: {...params}, raw: true, transaction })

const userService = {
    create,
    findById,
    findByParams,
    findOneByParams
}

export default userService
