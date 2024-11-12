import { useProfileStore } from '@/store/useProfileStore';
import { toast } from '@/hooks/use-toast';

export function completeQuest(taskId: number) {
  const { tasks, updateTaskStatus } = useProfileStore.getState();

  const task = tasks.find(task => task.id === taskId);
  if (task && task.status !== 'Completed') {
    updateTaskStatus(taskId, 'Completed');
    toast({
      title: "Quest Completed!",
      description: `You have completed the quest: "${task.title}".`,
    });
  }
}
