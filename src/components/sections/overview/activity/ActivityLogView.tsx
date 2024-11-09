import React, { useState } from 'react';
import ActivityLogItem from './ActivityLogItem';
import { useProfileStore } from '@/store/useProfileStore';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 3;

const ActivityLogView: React.FC = () => {
  const activities = useProfileStore((state) => state.activities);

  // Sort activities by datetime in descending order
  const sortedActivities = [...activities].sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedActivities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="space-y-4">
      {currentItems.map((item) => (
        <ActivityLogItem key={item.id} item={item} />
      ))}
      <div className="flex justify-center space-x-2 mt-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm"
        >
          Previous
        </Button>
        <span className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ActivityLogView;