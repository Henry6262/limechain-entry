import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Task } from '@/types/types';

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const taskStats = {
    completed: tasks.filter(task => task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    notStarted: tasks.filter(task => task.status === 'Not Started').length,
  };

  const totalTasks = taskStats.completed + taskStats.inProgress + taskStats.notStarted;
  const completionPercentage = (taskStats.completed / totalTasks) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Task Completion</span>
        <span>{completionPercentage.toFixed(0)}%</span>
      </div>
      <Progress value={completionPercentage} className="h-2" />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-2 bg-secondary rounded-lg">
          <CheckCircle className="text-green-500 mb-1" />
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-lg font-semibold">{taskStats.completed}</p>
        </div>
        <div className="flex flex-col items-center p-2 bg-secondary rounded-lg">
          <Clock className="text-yellow-500 mb-1" />
          <p className="text-xs text-muted-foreground">In Progress</p>
          <p className="text-lg font-semibold">{taskStats.inProgress}</p>
        </div>
        <div className="flex flex-col items-center p-2 bg-secondary rounded-lg">
          <AlertCircle className="text-red-500 mb-1" />
          <p className="text-xs text-muted-foreground">Not Started</p>
          <p className="text-lg font-semibold">{taskStats.notStarted}</p>
        </div>
      </div>
    </div>
  );
}