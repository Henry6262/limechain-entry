import { useProfileStore } from '@/store/useProfileStore';
import { ActivityLogItem } from '@/types/types';

export function addActivity(activity: Omit<ActivityLogItem, 'id'>) {
  const { activities, addActivity } = useProfileStore.getState();
  const newActivity: ActivityLogItem = {
    id: activities.length + 1, // Simple ID generation
    ...activity,
  };
  addActivity(newActivity);
}
