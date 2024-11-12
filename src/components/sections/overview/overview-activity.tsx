'use client'

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import ActivityLogView from './activity/activity-log-view';

const activityData = [
  { date: '2023-05-01', tasks: 5 },
  { date: '2023-05-02', tasks: 3 },
  { date: '2023-05-03', tasks: 7 },
  { date: '2023-05-04', tasks: 2 },
  { date: '2023-05-05', tasks: 6 },
];

export default function OverviewActivity() {
  const [activityViewType, setActivityViewType] = useState<'chart' | 'log'>('log');

  return (
    <div className="mb-4">
      <Card className=" text-white">
        <CardContent className="p-6">
          <ActivityLogView />
        </CardContent>
      </Card>
    </div>
  );
}