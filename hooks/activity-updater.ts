'use client'
import React, { useEffect } from 'react'
import axios from 'axios'

const updateActivity = async (userId: string) => {
  try {
    await axios.patch(`/api/users/${userId}/`, {
      lastActiveAt: new Date().toISOString(),
    })
    console.log('Updated last active time')
  } catch (error) {
    console.error('Failed to update last active time', error)
  }
}

const ActivityUpdater = ({ userId }: { userId: string }) => {
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     updateActivity(userId)
  //   }, 300000)
  //   // cập nhật mỗi 5 phút (300000 milliseconds)

  //   return () => clearInterval(intervalId) // Dọn dẹp khi component unmount
  // }, [userId])

  return null // Không render gì cả
}

export default ActivityUpdater
