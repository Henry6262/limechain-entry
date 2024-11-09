'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from './sidebar/Sidebar';
import BlockchainSection from '../sections/blockchain/Blockchain';
import OverviewSection from '../sections/overview/Overview'; 
import StatsSection from '../sections/nfts/NFTs'; 
import Nav from '../common/Nav';
import Modal from '../common/Modal';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function DashboardLayout() {
  const { status } = useSession();
  const [activeSection, setActiveSection] = useState('Overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    if (status === 'unauthenticated') {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [status]);

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
      <main className="flex-1 overflow-hidden">

        <Nav position={'absolute'} displayLogo={false}></Nav>
        {renderActiveSection()}

        <Modal isOpen={isModalOpen} onClose={() => {}} title="Connect Wallet" showCloseButton={false}>
          <div className="flex flex-col items-center">
            <p className="mb-4 text-center">
              To access the application, please connect your wallet.
            </p>
            <ConnectButton />
          </div>
        </Modal>

      </main>
    </div>
  );
}