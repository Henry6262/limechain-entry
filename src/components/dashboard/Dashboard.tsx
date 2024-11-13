'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Sidebar from './sidebar/sidebar';
import BlockchainSection from '../sections/blockchain/blockchain';
import OverviewSection from '../sections/overview/overview'; 
import NFTSection from '../sections/nfts/nfts'; 
import Nav from '../common/nav';
import Modal from '../common/modal';
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
      case 'NFTs':
        return <NFTSection />;
      default:
        return <BlockchainSection />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <main className="p-8 pt-20 sm:p-16  flex-1 bg-gradient-to-br from-[#05000f] via-[#1c073b] to-black overflow-hidden">

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