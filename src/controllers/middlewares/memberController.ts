import { Request, Response, NextFunction } from 'express'
import Member from '../../models/Member'

function memberControllerMiddleware(
    req: Request,
    res: Response, 
    next: NextFunction
){
    req.model = Member
    
    next()
}

export { memberControllerMiddleware }
