import React from 'react'

interface SpinnerProps {
  size?: number
  color?: string
  fullPage?: boolean
  loadingText?: string
}

export default function Spinner({ 
  size = 40, 
  color = '#8B5CF6', 
  fullPage = false,
  loadingText = 'Loading...'
}: SpinnerProps) {
  const spinnerContent = (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="animate-spin"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M10,50 A40,40 0 0,1 90,50 A40,40 0 0,1 10,50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="90" cy="50" r="5" fill={color}>
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-3/5 h-3/5 rounded-full animate-pulse"
          style={{ backgroundColor: `${color}33` }}
        />
      </div>
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-transparent z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center">
          {spinnerContent}
          <p className="mt-4 text-lg font-medium text-purple-600 dark:text-purple-400">{loadingText}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center">
      {spinnerContent}
    </div>
  )
}