import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import ToastProvider from '@/components/providers/toaster-provider'
import { viVN } from '@clerk/localizations'
import ActivityUpdater from '@/hooks/activity-updater'
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BetterMind',
  description: 'Học tập trực tuyến',
}

const prisma = new PrismaClient()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = auth()
  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId || '',
    },
  })

  return (
    <ClerkProvider localization={viVN}>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
          {dbUser && <ActivityUpdater userId={dbUser.id} />}
        </body>
      </html>
    </ClerkProvider>
  )
}
