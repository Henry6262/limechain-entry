import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useProfileStore } from '@/store/useProfileStore';

const ActivityChartView: React.FC = () => {
  const activities = useProfileStore((state) => state.activities);

  const filteredData = useMemo(() => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const filteredActivities = activities.filter(activity => new Date(activity.datetime) >= oneHourAgo);

    // Aggregate data by minute
    const aggregatedData = filteredActivities.reduce((acc, activity) => {
      const date = new Date(activity.datetime);
      const timeKey = `${date.getHours()}:${date.getMinutes()}`; // Group by hour and minute
      if (!acc[timeKey]) {
        acc[timeKey] = { time: timeKey, tasks: 0 };
      }
      acc[timeKey].tasks += 1;
      return acc;
    }, {} as Record<string, { time: string; tasks: number }>);

    return Object.values(aggregatedData);
  }, [activities]);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={filteredData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
            labelStyle={{ color: '#D1D5DB' }}
          />
          <Line type="monotone" dataKey="tasks" stroke="#8B5CF6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChartView;