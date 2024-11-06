'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, User, Twitter, Chrome } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("manual")

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-[#8A2BE2] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:bg-[#9A3CF2] transition-colors duration-300"
        >
          Open Login
        </Button>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px] bg-[#0D0221] border border-purple-500 text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-white mb-4">Login</DialogTitle>
              </DialogHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#190B33]">
                  <TabsTrigger 
                    value="manual"
                    className={`${activeTab === 'manual' ? 'bg-[#8A2BE2] text-white' : 'text-gray-400'} transition-all duration-300`}
                  >
                    Manual
                  </TabsTrigger>
                  <TabsTrigger 
                    value="social"
                    className={`${activeTab === 'social' ? 'bg-[#8A2BE2] text-white' : 'text-gray-400'} transition-all duration-300`}
                  >
                    Social
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mt-4"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="name" className="pl-10 bg-[#190B33] border-purple-500 text-white" placeholder="Enter your name" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="email" className="pl-10 bg-[#190B33] border-purple-500 text-white" placeholder="Enter your email" type="email" />
                      </div>
                    </div>
                    <Button className="w-full bg-[#8A2BE2] hover:bg-[#9A3CF2] text-white">
                      Submit
                    </Button>
                  </motion.div>
                </TabsContent>
                <TabsContent value="social">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mt-4"
                  >
                    <Button 
                      className="w-full bg-[#6B46C1] hover:bg-[#553C9A] text-white"
                    >
                      <Chrome className="mr-2 h-4 w-4 text-yellow-400" /> Login with Google
                    </Button>
                    <Button 
                      className="w-full bg-[#805AD5] hover:bg-[#6B46C1] text-white"
                    >
                      <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" /> Login with Twitter
                    </Button>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}