import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // const { userId } = auth()
    const userId = params.userId
    const values = await req.json()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...values,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log('[COURSE_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const user = await db.user.findUnique({
      where: {
        id: params.userId,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    console.log('[COURSE_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
