'use client'

import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import BlockchainSection from '../sections/blockchain/Blockchain';
import OverviewSection from '../sections/overview/Overview'; 
import StatsSection from '../sections/stats/Stats'; 
import Nav from '../common/Nav';

export default function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('Overview');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Overview':
        return <OverviewSection />;
      case 'Blockchain':
        return <BlockchainSection />;
      case 'Stats':
        return <StatsSection />;
      default:
        return <BlockchainSection />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <main className="flex-1">
        <Nav position={'absolute'} displayLogo={false}></Nav>
        {renderActiveSection()}
      </main>
    </div>
  );
}