import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { TUser } from '../types/type'
import { responseError } from '../common/response'
import { trueThrowError } from '../common/check'

const validateToken = async(req: Request, res: Response, next: NextFunction):Promise<any>=>{
    try{
        const secretKey = process.env.SECRET_KEY as string
        const token = req.headers['token']

        trueThrowError(!token || typeof token !== 'string', 'Token is required')

        const decoded = jwt.verify(token as string, secretKey)
        const user = decoded as TUser

        req.params.userId = String(user.id)
        
        next()
    } catch(err){
        return responseError(res, err, 401)
    }
}

const userAuth = {
    validateToken
}

export default userAuth