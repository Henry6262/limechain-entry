'use client'

import React from 'react';
import Lottie from 'react-lottie';
import TokenOverview from './blockchain-tokens-overview';
import RecentActivity from './blockchain-activity';
import BlockchainCards from './blockchain-info';
import blockchainAnimation from '../../../../public/lottie/blockchain.json'; // Import the animation

export default function BlockchainDashboard() {
  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: blockchainAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="min-h-screen">
      <div className="flex w-full flex-col">
        <div className="flex items-center mb-8">
          <Lottie 
            options={lottieDefaultOptions} 
            height={80} 
            width={70} 
            style={{ margin: 0 }}
          />
          <h2 className="text-3xl font-bold text-white">
            Blockchain overview
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <TokenOverview />
          </div>
          <div className="space-y-6">
            <BlockchainCards />
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}