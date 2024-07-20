import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { currentUser, auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    return NextResponse.json({
      role: user.roleName,
    })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
