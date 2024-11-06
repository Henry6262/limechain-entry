'use client'

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from './TitleAnimated';
import FeaturesCarousel from './FeaturesCarousel';
import LottieAnimation from './LottieDashboardAnimation';
import ProfileForm from '../create-profile/ProfileForm';

const MainContent = () => {
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
                        <AnimatedText /> ID
                    </span>
                </motion.h1>
                <div className="block lg:hidden">
                    <LottieAnimation />
                </div>
                <FeaturesCarousel />
                <ProfileForm />
            </div>
            <div className="hidden lg:block">
                <LottieAnimation />
            </div>
        </div>
    );
};

export default MainContent;