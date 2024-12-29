import { Request, Response } from "express"
import { Transaction } from "sequelize"

import sequelize from "../common/database"
import { getOffset } from '../common/util'
import { responseSuccess, responseError } from "../common/response"
import { emptyThrowError } from "../common/check"
import userService from "../service/userService"
import userImageService from "../service/userImageService"

const uploadImage = async(req: Request, res: Response):Promise<any>=>{
    try{
        const { userId } = req.params
        const { image } = req.body

        const result = await sequelize.transaction(async(transaction: Transaction)=>{
            emptyThrowError(image, 'Image is required')
            const newImage = await userImageService.create({userId: Number(userId), image: String(image)}, transaction)

            return newImage.toJSON()
        })

        return responseSuccess(res, result)
    } catch(err){
        return responseError(res, err)
    }
}

const findUserImages = async(req: Request, res: Response):Promise<any>=>{
    try{
        const { userId } = req.params
        const { pageNo } = req.query

        const numUserId: number = Number(userId)
        const numPageNo: number = Number(pageNo)

        const result = await sequelize.transaction(async(transaction: Transaction)=>{
            const user = await userService.findById(numUserId, transaction)
            emptyThrowError(user, "User does not exist")

            const userImages = await userImageService.findPaginated({userId: numUserId}, getOffset(numPageNo), transaction)

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
