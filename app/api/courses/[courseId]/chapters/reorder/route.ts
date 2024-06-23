import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      console.log(' [REORDER] Unauthorized')
      return new NextResponse('Unauthorized', { status: 401 })
    }
    const { list } = await req.json()
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    })
    console.log(params.courseId)

    if (!ownCourse) {
      console.log(' [REORDER] Unauthorized 2')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    }
    return new NextResponse('Success', { status: 200 })
  } catch (error) {
    console.log(' [REORDER]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
