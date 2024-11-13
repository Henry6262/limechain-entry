'use client'

import { Card, CardContent } from '@/components/ui/card';
import ActivityLogView from './activity/activity-log-view';

export default function OverviewActivity() {

  return (
    <div >
      <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
      <Card className=" text-white">
        <CardContent className="p-6">
          <ActivityLogView />
        </CardContent>
      </Card>
    </div>
  );
}