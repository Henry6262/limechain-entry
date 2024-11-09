'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/types';
import { useProfileStore } from '@/store/useProfileStore';
import { addActivity } from '@/utils/userActivityHandler';

interface TaskItemProps {
  task: Task;
}

const statusColors = {
  'Not Started': 'bg-red-500',
  'In Progress': 'bg-yellow-500',
  'Completed': 'bg-green-500',
} as const;

interface TaskStatusButtonProps {
  status: 'Not Started' | 'In Progress' | 'Completed';
  onClick: () => void;
  children: React.ReactNode;
}

const TaskStatusButton = ({ status, onClick, children }: TaskStatusButtonProps) => (
  <Button
    variant="outline"
    size="sm"
    className={`flex-1 ${statusColors[status]} hover:opacity-80 text-white`}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default function TaskItem({ task }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { updateTaskStatus } = useProfileStore();

  const handleStatusChange = (newStatus: 'Not Started' | 'In Progress' | 'Completed') => {
    const prevStatus = task.status;
    updateTaskStatus(task.id, newStatus);

    addActivity({
      type: 'task',
      action: newStatus === 'Completed' ? 'complete' : 'update',
      datetime: new Date().toISOString(),
      details: `${prevStatus} -> ${newStatus}`,
    });
  };

  const renderStatusButtons = () => {
    if (task.taskType !== 'manual') return null;

    const buttons = [];
    if (task.status !== 'In Progress') {
      buttons.push(
        <TaskStatusButton key="inProgress" status="In Progress" onClick={() => handleStatusChange('In Progress')}>
          Start Task
        </TaskStatusButton>
      );
    }
    if (task.status !== 'Completed') {
      buttons.push(
        <TaskStatusButton key="completed" status="Completed" onClick={() => handleStatusChange('Completed')}>
          Complete Task
        </TaskStatusButton>
      );
    }
    if (task.status !== 'Not Started') {
      buttons.push(
        <TaskStatusButton key="notStarted" status="Not Started" onClick={() => handleStatusChange('Not Started')}>
          Reset Task
        </TaskStatusButton>
      );
    }

    return buttons;
  };

  return (
    <Card className="bg-gray-800 w-full">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate pr-2">{task.title}</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <span className={`text-xs px-2 py-1 rounded ${statusColors[task.status]}`}>
            {task.status}
          </span>
          <span className="text-xs bg-purple-500 px-2 py-1 rounded">{task.points} pts</span>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-gray-300 mb-2">{task.description}</p>
              <div className="flex flex-wrap gap-2">
                {renderStatusButtons()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}