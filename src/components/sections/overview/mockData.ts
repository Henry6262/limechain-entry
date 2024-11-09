export interface Task {
    id: number;
    title: string;
    description: string;
    points: number;
    status: 'Not Started' | 'In Progress' | 'Completed';
  }
  
  export const initialTasks: Task[] = [
    { id: 1, title: 'Complete project', description: 'Finish all remaining tasks for the project', points: 100, status: 'In Progress' },
    { id: 2, title: 'Review code', description: 'Perform a thorough code review for the latest pull request', points: 50, status: 'Not Started' },
    { id: 3, title: 'Write documentation', description: 'Create comprehensive documentation for the new features', points: 75, status: 'Not Started' },
    { id: 4, title: 'Deploy application', description: 'Deploy the latest version of the application to production', points: 150, status: 'Completed' },
    { id: 5, title: 'User testing', description: 'Conduct user testing sessions for the new UI', points: 80, status: 'In Progress' },
    { id: 6, title: 'Optimize performance', description: 'Identify and fix performance bottlenecks', points: 120, status: 'Not Started' },
    { id: 7, title: 'Implement new feature', description: 'Develop and integrate the new analytics dashboard', points: 200, status: 'Not Started' },
    { id: 8, title: 'Refactor legacy code', description: 'Modernize and improve the codebase structure', points: 100, status: 'In Progress' },
  ];