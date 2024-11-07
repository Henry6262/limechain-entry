'use client'

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

interface NavProps {
  position: 'absolute' | 'relative';
  displayLogo?: boolean;
}

const Nav: React.FC<NavProps> = ({ position, displayLogo = true }) => {
  return (
    <nav className={`flex items-center justify-between p-4 bg-transparent ${position} top-0 left-0 w-full z-20`}>
      <div className="flex items-center">
        {displayLogo && (
          <Image 
            src="/images/logo-transparent.png" 
            alt="Company Logo" 
            width={70} 
            height={70} 
            className=""
          />
        )}
      </div>
      <div className="flex items-center space-x-4">
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Nav;
