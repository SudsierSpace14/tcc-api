import { Error as MongooseError } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
/*
    if (err.message.slice(err.message.length - 3, err.message.length - 2) === '4') {
      return res.status(err.message.slice(err.message.length - 3) as unknown as number).json({ error: err.message })
    }
*/

function ErrorMiddleware (err: Error | MongooseError | any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message, name: err.name })
  }

  res.json({ message: 'Internal server error' })
}

export default ErrorMiddleware
