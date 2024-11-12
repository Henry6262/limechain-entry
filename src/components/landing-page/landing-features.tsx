'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, BarChart, Wallet, Code, Zap } from 'lucide-react'

const features = [
    {
        icon: <LayoutDashboard className="h-10 w-10" />,
        title: "Dynamic Dashboard",
        description: "Interactive cards with real-time data"
    },
    {
        icon: <BarChart className="h-10 w-10" />,
        title: "Data Visualization",
        description: "Stunning charts for insightful analytics"
    },
    {
        icon: <Wallet className="h-10 w-10" />,
        title: "WAGMI Integration",
        description: "Seamless blockchain data display"
    },
    {
        icon: <Code className="h-10 w-10" />,
        title: "Code Quality",
        description: "Maintain high standards with ESLint"
    },
    {
        icon: <Zap className="h-10 w-10" />,
        title: "Responsive Design",
        description: "Optimal viewing on all devices"
    }
]

export default function FeatureCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="w-full mx-auto overflow-hidden">
            <Card className="bg-[#35096357] border-purple-500 shadow-lg shadow-purple-500/20">
                <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                        >
                            <motion.div
                                initial={{ scale: 0.8, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="bg-purple-600 rounded-full p-3 mr-6 flex-shrink-0"
                            >
                                {React.cloneElement(features[currentIndex].icon, { className: "h-10 w-10 text-white" })}
                            </motion.div>
                            <div className="flex-grow">
                                <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">{features[currentIndex].title}</h3>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
            <div className="flex justify-center mt-4 space-x-2">
                {features.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-purple-500' : 'bg-gray-600'}`}
                        initial={false}
                        animate={{ scale: index === currentIndex ? 1.2 : 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                ))}
            </div>
        </div>
    )
}