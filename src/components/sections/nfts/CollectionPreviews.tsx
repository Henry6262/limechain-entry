'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SimpleHashCollection } from '../../../types/types';

interface CollectionPreviewsProps {
    collections: Map<string, SimpleHashCollection>;
    onCollectionClick: (collectionId: string) => void;
}


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
        },
    },
}

export default function CollectionPreviews({ collections, onCollectionClick }: CollectionPreviewsProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const controls = useAnimation();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        controls.start('visible');
    }, [controls]);

    return (
        <ScrollArea className="w-full mt-2">
            <motion.div
                className="flex items-center pb-[7px]"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
                ref={scrollRef}
            >
                {Array.from(collections.values()).map((collection, index) => (
                    <motion.div
                        className="relative flex-shrink-0"
                        key={collection.collection_id}
                        style={{
                            padding: '13px 0px 5px 3px',
                            marginLeft: index === 0 ? 0 : '-20px',
                            zIndex: hoveredId === collection.collection_id ? 10 : 1,
                        }}
                        variants={itemVariants}
                        initial={{ y: 0, transition: { duration: 0.3 } }}
                        whileHover={{
                            scale: 1.1,
                            y: -10,
                            zIndex: 10,
                            transition: { duration: 0.3 },
                        }}
                        onHoverStart={() => setHoveredId(collection.collection_id)}
                        onHoverEnd={() => setHoveredId(null)}
                        onClick={() => onCollectionClick(collection.collection_id)}
                    >
                        <motion.div
                            className="w-16 h-16 rounded-full border-2 border-purple-700 overflow-hidden"
                            whileHover={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.7)' }}
                        >
                            <motion.img
                                src={collection.image_url}
                                alt={collection.name}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}