import { getProgress } from './get-process'
import { db } from '@/lib/db'
import { Category, Course } from '@prisma/client'
type CourseWithProgressWithCategory = Course & {
  category: Category | null
  chapters: { id: string }[]
  progress: number | null
}

type GetCourses = {
  userId: string
  title?: string
  categoryId?: string
}

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        // TODO: Uncomment this line when the course is published
        // isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            // TODO: Uncomment this line when the chapter is published
            // isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            }
          }
          const progressPercentage = await getProgress(userId, course.id)

          return {
            ...course,
            progress: progressPercentage,
          }
        })
      )

    return coursesWithProgress
  } catch (error) {
    console.log(' [GET_COURSES]', error)
    return []
  }
}