import { Request } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from "@aws-sdk/client-s3";
import 'dotenv/config'

import { TUser } from '../types/type';

const awsBucketName = process.env.AWS_BUCKET_NAME as string
const awsBucketRegion = process.env.AWS_BUCKET_REGION as string
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID as string
const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY as string

export const getOffset = (page: number) =>{
    return (page * 5) - 5
}

export const hashPassword = (password: string):string =>{
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    return hashedPassword
}

export const comparePassword = (password: string, hashedPassword: string) => bcrypt.compareSync(password, hashedPassword)

export const generateToken = (payload: TUser) => {
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
        throw new Error("Private key is not defined in environment variables.");
    }

    const token = jwt.sign(payload, secretKey)

    return token
}

const s3 = new S3Client({
    region: awsBucketRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey
    }
})

export const uploadImage = multer({
    storage: multerS3({
      s3: s3,
      bucket: awsBucketName,
      metadata: function (req: Request, file: Express.Multer.File, cb: (error: any, metadata?: { fieldName: string }) => void) {
            cb(null, {fieldName: file.fieldname});
      },
      key: function (req: Request, file: Express.Multer.File, cb: (error: any, filename?: string) => void) {
        const filename = 'kinobi_test-' + Date.now().toString() + path.extname(file.originalname)
        if(req.body){
            req.body.image = process.env.CF_URL + filename
            cb(null, filename)
        } 
      },
      contentType: multerS3.AUTO_CONTENT_TYPE
    })
})