import { Task } from '@/types/types';

export const initialQuestTasks: Task[] = [
    {
      id: 1,
      title: 'Complete Profile Information',
      description: 'Fill out your name and email in your profile.',
      points: 50,
      status: 'Not Started',
      taskType: 'quest',
    },
    {
      id: 2,
      title: 'Use Token Checker',
      description: 'Use the Token Checker to fetch token data for the first time.',
      points: 30,
      status: 'Not Started',
      taskType: 'quest',
    },
    {
      id: 3,
      title: 'Create Your First Task',
      description: 'Create your first manual task using the task creation form.',
      points: 20,
      status: 'Not Started',
      taskType: 'quest',
    },
    {
      id: 4,
      title: 'Use NFT Overview',
      description: 'Fetch NFT collection data and select a collection other than the default.',
      points: 45,
      status: 'Not Started',
      taskType: 'quest',
    },
    // Add more initial quest tasks as needed
  ];