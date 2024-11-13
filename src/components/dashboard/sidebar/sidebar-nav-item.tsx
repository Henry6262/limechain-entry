"use client"

import * as React from 'react'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
  onClick: () => void
}

export function SidebarNavItem({ icon: Icon, label, href, onClick }: NavItemProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <motion.a
            href={href}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-950"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
          </motion.a>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          align="start" 
          className="bg-purple-900 text-white px-3 py-1.5 text-sm font-medium rounded-md shadow-lg border border-purple-800"
          sideOffset={5}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}