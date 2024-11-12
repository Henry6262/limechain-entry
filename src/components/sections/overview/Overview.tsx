'use client'

import { useEffect } from 'react';
import ProfileSection from './overview-profile';
import OverviewTasks from './overview-tasks';
import { useProfileStore } from '@/store/useProfileStore';
import OverviewActivity from './overview-activity';

export default function Overview() {
  const { tasks, initializeTasks, initializeWalletData } = useProfileStore();

  useEffect(() => {
    initializeTasks();
    initializeWalletData(); 
  }, []);

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
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