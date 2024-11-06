'use client'
import React from 'react';
import { motion } from 'framer-motion';

const ParticleField = ({ count = 50 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    velocity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      {particles.map((particle) => (
        <motion.circle
          key={particle.id}
          cx={`${particle.x}%`}
          cy={`${particle.y}%`}
          r={particle.size}
          fill="#8A2BE2"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [`${particle.y}%`, `${(particle.y - particle.velocity * 100 + 100) % 100}%`],
          }}
          transition={{
            duration: 10 / particle.velocity,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
};

export default ParticleField;