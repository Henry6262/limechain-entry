'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Title from './landing-title';
import Features from './landing-features';
import LottieAnimation from './landing-lottie';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Updated import
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'; // Assuming you're using Radix UI for popovers

const MainContent = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleButtonClick = () => {
        if (session) {
            router.push('/dashboard');
        }
    };

    return (
        <div className="relative mx-auto px-16 py-12 sm:py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between min-h-screen z-10">
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

                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            onClick={handleButtonClick}
                            className="bg-[#8A2BE2] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg shadow-lg hover:bg-[#9A3CF2] transition-colors duration-300 mt-4 md:mt-6"
                        >
                            Go to Dashboard
                        </button>
                    </PopoverTrigger>
                    {!session && (
                        <PopoverContent className="bg-[#0D0221] border border-purple-500 text-white p-4">
                            Please connect your wallet to proceed.
                        </PopoverContent>
                    )}
                </Popover>
            </div>
            <div className="hidden lg:block">
                <LottieAnimation />
            </div>
        </div>
    );
};

export default MainContent;