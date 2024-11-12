'use client'

import React from 'react';
// import ParticleBackground from './LandingBG';
import Content from './LandingContent';
import Nav from '../common/nav';

export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-[#0D0221] text-white overflow-hidden">
            <Nav position="absolute" />
            <Content />
        </div>
    );
}