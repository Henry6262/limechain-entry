import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialQuestTasks } from '@/lib/helpers/initialQuestTasks';
import { Task, ActivityLogItem } from '@/types/types';
import { toast } from '@/hooks/use-toast';

interface ProfileState {
  name: string;
  email: string;
  walletAddress: string;
  tasks: Task[];
  activities: ActivityLogItem[];
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setWalletAddress: (walletAddress: string) => void;
  profileExists: (walletAddress: string) => boolean;
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: number, status: 'Not Started' | 'In Progress' | 'Completed') => void;
  addActivity: (activity: ActivityLogItem) => void;
  initializeTasks: () => void;
}

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      console.log('Applying', args);
      set(args);
      console.log('New state', get());
    },
    get,
    api
  );

export const useProfileStore = create<ProfileState>()(
  log(
    persist(
      (set, get: () => ProfileState) => ({
        name: '',
        email: '',
        walletAddress: '',
        tasks: [],
        activities: [],
        setName: (name: any) => set(() => ({ name })),
        setEmail: (email: any) => set(() => ({ email })),
        setWalletAddress: (walletAddress: string) => set(() => ({ walletAddress })),
        profileExists: (walletAddress: string) => {
          const currentWalletAddress = get().walletAddress;
          return currentWalletAddress === walletAddress;
        },
        addTask: (task: Task) => set((state: { tasks: Task[]; }) => ({
          tasks: [
            ...state.tasks,
            { ...task, points: task.taskType === 'manual' ? 0 : task.points }
          ]
        })),
        updateTaskStatus: (taskId: number, status: 'Not Started' | 'In Progress' | 'Completed') => {
          set((state: ProfileState) => {
            const updatedTasks = state.tasks.map((task: Task) => {
              if (task.id === taskId) {
                if (task.taskType === 'quest' && status === 'Completed' && task.status !== 'Completed') {
                  toast({
                    title: "Quest Completed!",
                    description: `You have completed the quest: "${task.title}".`,
                  });
                }
                return { ...task, status };
              }
              return task;
            });
            return { tasks: updatedTasks };
          });
        },
        addActivity: (activity: any) => set((state: { activities: any; }) => ({
          activities: [...state.activities, activity]
        })),
        initializeTasks: () => {
          const existingTasks = get().tasks;
          if (existingTasks.length === 0) {
            set(() => ({ tasks: initialQuestTasks }));
          }
        },
      }),
      {
        name: 'profile-storage',
      }
    )
  )
);