// 'use server'
// // import { getServerSession } from "next-auth";
// import { db } from '@/lib/db'
// import { auth } from '@clerk/nextjs/server'
// // import{ authOptions } from "./lib/auth";
// export async function postData(formData: FormData) {
//   'use server'
//   // session = await getServerSession(authOptions)
//   const { userId } = auth()
//   const message = formData.get('message')
//   const data = await db.message.create({
//     data: {
//       message: message as string,
//       userId,
//     },
//   })
// }
