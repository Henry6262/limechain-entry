'use client'

import { useEffect } from 'react';
import Lottie from 'react-lottie';
import ProfileSection from './overview-profile';
import OverviewTasks from './overview-tasks';
import { useProfileStore } from '@/store/useProfileStore';
import OverviewActivity from './overview-activity';
import dashboardAnimation from '../../../../public/lottie/dashboard.json';

export default function Overview() {
  const { tasks, initializeTasks, initializeWalletData } = useProfileStore();

  useEffect(() => {
    initializeTasks();
    initializeWalletData(); 
  }, []);

  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dashboardAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="min-h-screen text-white">
      <div className="flex items-center mb-6">
        <Lottie 
          options={lottieDefaultOptions} 
          height={80} 
          width={80} 
          style={{ margin: 0 }}
        />
        <h2 className="text-3xl text-tertiary font-bold pl-4">Dashboard</h2>
      </div>
      
      {/* Tasks Section */}
      <div className="w-full overflow-hidden">
        <div className="w-full max-w-full mx-auto">
          <OverviewTasks tasks={tasks} />
        </div>
      </div>
      
      {/* Profile and Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileSection />
        <OverviewActivity />
      </div>
    </div>
  );
}