'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProfileSection from './OverviewProfile';
import OverviewTasks from './OverviewTasks';
import { useProfileStore } from '@/store/useProfileStore';
import OverviewActivity from './OverviewActivity';

export default function Overview() {
  const { tasks, initializeTasks } = useProfileStore();

  useEffect(() => {
    initializeTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Dashboard</h1>
      
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