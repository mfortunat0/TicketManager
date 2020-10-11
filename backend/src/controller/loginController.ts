import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const loginAuth = (req: Request, res: Response) => {
  const { email, password } = req.body

  async function main () {
    if (email === process.env.ADM_EMAIL && password === process.env.ADM_PASSWORD) {
      res.status(200).json({
        token: Jwt.sign({ id: 0 }, process.env.JWT_KEY, {
          expiresIn: '1d'
        })
      })
    } else {
      const result = await prisma.register.findFirst({
        where: {
          email
        }
      })
      if (result) {
        if (await Bcrypt.compare(password, result.password)) {
          res.status(200).json({
            token: Jwt.sign({ id: result.id }, process.env.JWT_KEY, {
              expiresIn: '1d'
            })
          })
        } else {
          res.status(404).json()
        }
      } else {
        res.status(404).json()
      }
    }
  }

  main()
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default { loginAuth }
