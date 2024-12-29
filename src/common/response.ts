import { Response } from "express"

export const responseSuccess = (res: Response, result: any) => res.json(result) 
export const responseError = (res: Response, err: any) => res.status(400).send(err.message) 