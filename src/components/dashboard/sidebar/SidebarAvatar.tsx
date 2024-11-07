"use client"

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function SidebarAvatar() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-purple-900 p-4 text-white">
          <div className="text-center">
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-xs text-gray-300">0x1234...5678</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
