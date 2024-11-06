import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useAccount } from 'wagmi';

const Nav = () => {
  const { data: session, status } = useSession();
  const { isConnected } = useAccount();

  return (
    <nav className="flex items-center justify-between p-4 bg-transparent absolute top-0 left-0 w-full z-20">
      <div className="flex items-center">
        <Image 
          src="/images/logo-transparent.png" 
          alt="Company Logo" 
          width={70} 
          height={70} 
          className=""
        />
      </div>
      <div className="flex items-center space-x-4">
        <ConnectButton />
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : session ? (
          <div>
            <p>Welcome, {session.user!.name}</p>
            <p>Address: {session.address!}</p>
          </div>
        ) : isConnected ? (
          <p>Connected, but not authenticated</p>
        ) : (
          <p>Please connect your wallet</p>
        )}
      </div>
    </nav>
  );
};

export default Nav;
