import { Request, Response } from 'express'
import { Transaction } from 'sequelize'

import sequelize from '../common/database'
import { emptyThrowError, notEmptyThrowError, trueThrowError } from '../common/check'
import { comparePassword, generateToken, hashPassword } from '../common/util'
import { responseSuccess, responseError} from '../common/response'
import userService from '../service/userService'
import { TUser } from '../types/type'

const signup = async(req: Request, res: Response):Promise<any>=>{
    try{
        const { name, username, password } = req.body 

        const result = await sequelize.transaction(async(transaction)=>{
            trueThrowError(name.length < 4, 'Name min. 4 character')
            trueThrowError(username.length < 4, 'Username min. 4 character')
            trueThrowError(password.length < 4, 'Password min. 4 character')

            const existingUser = await userService.findOneByParams({ username }, transaction)

            notEmptyThrowError(existingUser, 'User already exist')

            const hashedPassword = hashPassword(password) 

            const newUser = await userService.create({
                name,
                username,
                password: hashedPassword
            }, transaction)

            const token = generateToken(newUser.toJSON())

            return token
        })

        return responseSuccess(res, { token: result})
    } catch(err){
        return responseError(res, err)
    }
}

const signin = async(req: Request, res: Response):Promise<any>=>{
    try{
        const { username, password } = req.body

        const result = await sequelize.transaction(async(transaction: Transaction)=>{
            emptyThrowError(username, 'Username is required')
            emptyThrowError(password, 'Password is required')

            const user = await userService.findOneByParams({username}, transaction)

            emptyThrowError(user, 'Invalid username / password')

            const userData = user as TUser;

            trueThrowError(!comparePassword(password, userData.password), 'Invalid username / password')
            
            const token = generateToken(user as TUser)

            return token
        })

        return responseSuccess(res, { token: result })
    } catch(err){
        return responseError(res, err)
    }
}

const userHandler = {
    signup,
    signin
}

export default userHandler