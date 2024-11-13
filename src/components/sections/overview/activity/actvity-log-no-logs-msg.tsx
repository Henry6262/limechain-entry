import React from 'react'
import { AlertCircle } from 'lucide-react'

export default function NoLogsAvailable() {
  return (
    <div className="flex flex-col items-center justify-center p-8  rounded-lg shadow-sm border">
      <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
      <h3 className="text-lg font-semibold  mb-2">No Logs Available</h3>
      <p className="text-center  text-sm sm:text-base mb-6 max-w-md">
        It looks like you haven&apos;t interacted with the app yet. Start by creating a task or updating your profile.
      </p>
    </div>
  )
}