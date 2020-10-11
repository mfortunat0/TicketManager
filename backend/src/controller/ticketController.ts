import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const create = (req: Request, res: Response) => {
  const id = res.locals.id
  const { title, data, status } = req.body

  async function main () {
    const result = await prisma.register.findOne({
      where: {
        id
      }
    })
    if (result) {
      const newClient = await prisma.ticket.create({
        data: {
          client: result.name,
          title,
          data,
          status
        }
      })
      res.status(201).json(newClient)
    } else {
      res.status(404).json()
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

const findall = (req: Request, res: Response) => {
  const id = res.locals.id
  async function main () {
    if (res.locals.id === 0) {
      const result = await prisma.ticket.findMany()
      res.status(200).json(result.reverse())
    } else {
      const { name: client } = await prisma.register.findOne({
        where: {
          id
        }
      })
      const result = await prisma.ticket.findMany({
        where: {
          client
        }
      })
      res.status(200).json(result.reverse())
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

const update = (req: Request, res: Response) => {
  const { id, newStatus } = req.body
  async function main () {
    const result = await prisma.ticket.update({
      where: { id },
      data: { status: newStatus }
    })
    res.status(200).json(result)
  }
  main()
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default { create, findall, update }
