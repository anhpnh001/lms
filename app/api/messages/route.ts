import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const { text } = await req.json()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const message = await db.message.create({
      data: {
        text,
        userId,
      },
    })

    return NextResponse.json(message)
  } catch (error) {
    console.log('[COURSES]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const messages = await db.message.findMany()

    return NextResponse.json(messages)
  } catch (error) {
    console.log('[COURSES]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
