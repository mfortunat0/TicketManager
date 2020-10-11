import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'

interface IJwt{
    id: string
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (error, result: IJwt) => {
        if (!error) {
          res.locals.id = result.id
          next()
        } else { res.status(401).json() }
      })
    } else { res.status(401).json() }
  } else { res.status(401).json() }
}

export default { auth }
