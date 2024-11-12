"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../../ui/button'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  navItems: { icon: React.ElementType; label: string; href: string }[]
  setActiveSection: (section: string) => void
}

export function MobileSidebar({ isOpen, onClose, navItems, setActiveSection }: MobileSidebarProps) {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden`}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="h-full w-64 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center space-x-4">
              {/* Add your avatar and user info here */}
            </div>
            <nav className="space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-4 rounded-lg p-2 transition-colors duration-200 hover:bg-purple-900"
                  onClick={() => {
                    setActiveSection(item.label);
                    onClose();
                  }}
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
            <Button className="mt-4 w-full">
              Toggle Theme
            </Button>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}