import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import { TUser } from '../types/type'
import { responseError } from '../common/response'

const validateToken = async(req: Request, res: Response, next: NextFunction):Promise<any>=>{
    try{
        const secretKey = process.env.SECRET_KEY as string
        const token = req.headers['token']

        if (!token || typeof token !== 'string') {
            throw new Error('Token is required and must be a string');
        }

        console.log(token)
        const decoded = jwt.verify(token, secretKey)
        const user = decoded as TUser

        req.params.userId = String(user.id)
        
        next()
    } catch(err){
        return responseError(res, err)
    }
}

const userAuth = {
    validateToken
}

export default userAuth