import React from 'react';
import { ActivityLogItem as ActivityLogItemType, ActivityType } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, FileText, Lock, Search, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ActivityLogItemProps {
  item: ActivityLogItemType;
  isExpanded: boolean;
  toggleExpansion: () => void;
}

const ActivityLogItem: React.FC<ActivityLogItemProps> = ({ item, isExpanded, toggleExpansion }) => {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'task':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'auth':
        return <Lock className="h-5 w-5 text-green-500" />;
      case 'fetch token':
        return <Search className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
      case 'login':
        return 'bg-green-500';
      case 'complete':
      case 'logout':
        return 'bg-blue-500';
      case 'update':
      case 'update profile':
        return 'bg-yellow-500';
      case 'search':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (datetime: string) => {
    const now = new Date();
    const past = new Date(datetime);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <Card className="bg-secondary relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center space-x-3 flex-grow">
            {getActivityIcon(item.type)}
            <div>
              <p className="font-semibold capitalize">{item.type}</p>
              <p className="text-sm text-muted-foreground">{formatTimeAgo(item.datetime)}</p>
            </div>
          </div>
          <Badge className={`${getActionColor(item.action)} text-white`}>
            {item.action}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute !bg-transparent top-[-0.5rem] right-[0.5rem]"
          onClick={toggleExpansion}
          aria-label={isExpanded ? "Collapse details" : "Expand details"}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isExpanded && item.details && (
          <div className="mt-2 p-2 bg-background rounded-md">
            <p className="text-sm">{item.details}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLogItem;