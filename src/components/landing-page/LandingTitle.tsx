'use client'

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = () => {
  const letters = "LIMECHAIN".split("");

  return (
    <span className="relative inline-block">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        >
          <motion.span
            className="inline-block"
            animate={{
              color: ['#8A2BE2', '#ffffff', '#8A2BE2'],
              textShadow: [
                '0 0 5px #8A2BE2, 0 0 10px #8A2BE2',
                '0 0 20px #8A2BE2, 0 0 30px #8A2BE2',
                '0 0 5px #8A2BE2, 0 0 10px #8A2BE2'
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            {letter}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedText;