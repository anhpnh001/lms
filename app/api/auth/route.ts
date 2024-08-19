import { NextResponse } from 'next/server'
import { currentUser, auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const user = await currentUser()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.emailAddresses[0].emailAddress ?? '',
        roleName: 'Admin',
      },
    })
  }

  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  })
}
