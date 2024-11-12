import React from 'react';
import { ActivityLogItem as ActivityLogItemType } from '@/types/types';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ActivityLogItemProps {
  item: ActivityLogItemType;
  isExpanded: boolean;
  toggleExpansion: () => void;
}

const ActivityLogItem: React.FC<ActivityLogItemProps> = ({ item, isExpanded, toggleExpansion }) => {
  return (
    <div className="bg-secondary relative">
      <div className="flex items-center justify-between pr-8 p-4">
        <div className="flex items-center space-x-3 flex-grow">
          <span className="font-bold">{item.type}</span> - <span>{item.action}</span>
          {item.details && <span> - {item.details}</span>}
        </div>
        <span className="text-sm text-gray-400">{new Date(item.datetime).toLocaleString()}</span>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[-0.5rem] right-[0.5rem]"
          onClick={toggleExpansion}
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      {isExpanded && item.details && (
        <div className="mt-2 p-2 bg-background rounded-md">
          <p className="text-sm">{item.details}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLogItem;
