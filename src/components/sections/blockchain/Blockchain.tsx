'use client'

import React from 'react';
import TokenOverview from './blockchain-tokens-overview';
import RecentActivity from './blockchain-activity';
import BlockchainCards from './blockchain-cards';

export default function BlockchainDashboard() {
  return (
    <div className="min-h-screen">
      <div className="flex w-full flex-col ">
        <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Blockchain Dashboard
        </h2>

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