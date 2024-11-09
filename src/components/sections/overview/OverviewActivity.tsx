'use client'

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import ActivityChartView from './activity/ActivityChartView';
import ActivityLogView from './activity/ActivityLogView';
import { Button } from '@/components/ui/button';

const activityData = [
  { date: '2023-05-01', tasks: 5 },
  { date: '2023-05-02', tasks: 3 },
  { date: '2023-05-03', tasks: 7 },
  { date: '2023-05-04', tasks: 2 },
  { date: '2023-05-05', tasks: 6 },
];

export default function OverviewActivity() {
  const [activityViewType, setActivityViewType] = useState<'chart' | 'log'>('log');

  const formattedActivityData = useMemo(() => {
    return activityData.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
  }, []);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Activity</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={`bg-gray-800 hover:bg-gray-700 ${activityViewType === 'chart' ? 'bg-purple-500' : ''}`}
            onClick={() => setActivityViewType('chart')}
          >
            Chart
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`bg-gray-800 hover:bg-gray-700 ${activityViewType === 'log' ? 'bg-purple-500' : ''}`}
            onClick={() => setActivityViewType('log')}
          >
            Log
          </Button>
        </div>
      </div>
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activityViewType === 'chart' ? (
                <ActivityChartView />
              ) : (
                <ActivityLogView />
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}