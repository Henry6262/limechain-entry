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
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href={href}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-purple-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
          >
            <Icon className="h-6 w-6" />
          </motion.a>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-purple-900 text-white">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
