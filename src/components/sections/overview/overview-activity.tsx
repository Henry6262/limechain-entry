'use client'

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import ActivityLogView from './activity/activity-log-view';

export default function OverviewActivity() {

  return (
    <div >
      <Card className=" text-white">
        <CardContent className="p-6">
          <ActivityLogView />
        </CardContent>
      </Card>
    </div>
  );
}