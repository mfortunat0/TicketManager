import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import Bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const create = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const cryptPassword = await Bcrypt.hash(password, 4)

  async function main() {
    const result = await prisma.register.findFirst({
      where: {
        email
      }
    })
    if (!result) {
      const newRegister = await prisma.register.create({
        data: {
          name,
          email,
          password: cryptPassword
        }
      })
      res.status(201).json(newRegister)
    } else {
      res.status(409).json()
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

export default { create }
