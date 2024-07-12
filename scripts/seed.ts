const { PrismaClient } = require('@prisma/client')
const database = new PrismaClient()
async function main() {
  try {
    // await database.category.createMany({
    //   data: [{ name: 'Khóa học' }, { name: 'Luyện thi' }, { name: 'Cuộc thi' }],
    // })
    // await database.role.createMany({
    //   data: [{ name: 'Admin' }, { name: 'Teacher' }, { name: 'Student' }],
    // })
    await database.user.deleteMany()
    console.log('Success')
  } catch (error) {
    console.log("'Error seeding the database categories", error)
  } finally {
    await database.$disconnect()
  }
}

main()
