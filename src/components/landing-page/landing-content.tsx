'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Title from './landing-title'
import Features from './landing-features'
import LottieAnimation from './landing-lottie'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as PopoverPrimitive from '@radix-ui/react-popover'

export default function Component() {
  const { data: session } = useSession()
  const router = useRouter()
  const [popoverOpen, setPopoverOpen] = React.useState(false)

  const handleButtonClick = () => {
    if (session) {
      router.push('/dashboard')
    } else {
      setPopoverOpen(true)
    }
  }

  return (
    <div className="relative mx-auto px-6 py-12 sm:px-16 sm:py-16 flex flex-col lg:flex-row items-center justify-between min-h-screen z-10">
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center md:text-left mb-4 relative"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] to-white">
            <Title /> ID
          </span>
        </motion.h1>

        <div className="block lg:hidden">
          <LottieAnimation />
        </div>

        <Features />

        <PopoverPrimitive.Root open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverPrimitive.Trigger asChild>
            <button
              onClick={handleButtonClick}
              className="bg-[#8A2BE2] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:bg-[#9A3CF2] transition-colors duration-300 mt-4 md:mt-6"
            >
              Go to Dashboard
            </button>
          </PopoverPrimitive.Trigger>
          <AnimatePresence>
            {popoverOpen && !session && (
              <PopoverPrimitive.Portal forceMount>
                <PopoverPrimitive.Content sideOffset={5} align="start" asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="z-50 w-72 rounded-lg border border-purple-500 bg-[#0D0221] p-4 shadow-md outline-none"
                  >
                    <p className="text-sm font-medium text-white">Please connect your wallet to proceed.</p>
                    <PopoverPrimitive.Arrow className="fill-[#0D0221] stroke-purple-500" />
                  </motion.div>
                </PopoverPrimitive.Content>
              </PopoverPrimitive.Portal>
            )}
          </AnimatePresence>
        </PopoverPrimitive.Root>
      </div>
      <div className="hidden lg:block">
        <LottieAnimation />
      </div>
    </div>
  )
}