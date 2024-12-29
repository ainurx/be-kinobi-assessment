import { Request, Response } from "express"
import { Transaction } from "sequelize"

import sequelize from "../common/database"
import { responseSuccess, responseError } from "../common/response"
import { emptyThrowError } from "../common/check"
import userService from "../service/userService"
import userImageService from "../service/userImageService"

const uploadImage = async(req: Request, res: Response):Promise<any>=>{
    try{
        const { userId } = req.params
        const { image } = req.body

        await sequelize.transaction(async(transaction: Transaction)=>{
            await userImageService.create({userId: Number(userId), image}, transaction)

            return 
        })

        return responseSuccess(res, {image})
    } catch(err){
        return responseError(res, err)
    }
}

const findUserImages = async(req: Request, res: Response):Promise<any>=>{
    try{
        const { userId } = req.params
        const numUserId: number = Number(userId)

        const result = await sequelize.transaction(async(transaction: Transaction)=>{
            const user = await userService.findById(numUserId, transaction)
            emptyThrowError(user, "User does not exist")

            const userImages = await userImageService.findPaginated({userId: numUserId}, transaction)

            return userImages
        })

        return responseSuccess(res, result)
    } catch(err: any){
        return responseError(res, err)
    }
}

const userImageHandler = {
    uploadImage,
    findUserImages
}

export default userImageHandler
