import { Response } from "express"

export const responseSuccess = (res: Response, result: any) => res.json(result) 
export const responseError = (res: Response, err: any, status: number = 400) => res.status(status).send(err.message) 