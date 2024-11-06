'use client'

import React from 'react';
import ParticleField from './ui/ParticleBackground';
import MainContent from './ui/MainContent';
import Nav from './ui/Nav';

export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-[#0D0221] text-white overflow-hidden">
            <Nav />
            <ParticleField />
            <MainContent />
        </div>
    );
}