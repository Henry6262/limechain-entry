"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  navItems: { icon: React.ElementType; label: string; href: string }[]
  setActiveSection: (section: string) => void
}

export function MobileSidebar({ isOpen, onClose, navItems, setActiveSection }: MobileSidebarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-80 md:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full w-64 bg-background shadow-lg dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-border">
                <h2 className="text-2xl font-bold text-purple-500">Limechain</h2>
              </div>
              <nav className="flex-grow overflow-y-auto py-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-4 px-4 py-3 text-foreground hover:bg-purple-500 hover:text-white transition-colors duration-200"
                    onClick={() => {
                      setActiveSection(item.label);
                      onClose();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </nav>
              <div className="p-4 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}