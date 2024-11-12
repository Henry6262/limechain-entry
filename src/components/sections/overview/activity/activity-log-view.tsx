'use client'

import React, { useState } from 'react';
import { useProfileStore } from '@/store/useProfileStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ActivityLogItem from './activity-log-item';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const ActivityLogView: React.FC = () => {
  const activities = useProfileStore((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const sortedActivities = [...activities].sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

  const totalPages = Math.ceil(sortedActivities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <Card className="w-full bg-transparent border-none">
      <CardContent className="p-[0]">
        <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
        <div className="space-y-4">
          {currentItems.map((item) => (
            <ActivityLogItem
              key={item.id}
              item={item}
              isExpanded={expandedItems.includes(item.id.toString())} // Convert to string
              toggleExpansion={() => toggleItemExpansion(item.id.toString())} // Convert to string
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogView;