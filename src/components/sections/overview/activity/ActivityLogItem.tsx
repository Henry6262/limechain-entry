import React from 'react';
import { ActivityLogItem as ActivityLogItemType } from '@/types/types';

interface ActivityLogItemProps {
  item: ActivityLogItemType;
}

const ActivityLogItem: React.FC<ActivityLogItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-3 rounded">
      <div>
        <span className="font-bold">{item.type}</span> - <span>{item.action}</span>
        {item.details && <span> - {item.details}</span>}
      </div>
      <span className="text-sm text-gray-400">{new Date(item.datetime).toLocaleString()}</span>
    </div>
  );
};

export default ActivityLogItem;
