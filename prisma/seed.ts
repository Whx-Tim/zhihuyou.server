import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

async function main() {
  dotenv.config()

  console.log('Seeding...')

  const user1 = await prisma.user.create({
    data: {
      email: 'cali@zolran.com',
      firstname: 'Cali',
      lastname: 'Castle',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'ADMIN',
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'timx@zolran.com',
      firstname: 'Timx',
      lastname: 'Wong',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  })

  console.log({ user1, user2 })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
