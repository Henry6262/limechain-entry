'use client'

import { Card, CardContent } from '@/components/ui/card';
import { useProfileStore } from '@/store/useProfileStore';
import ProfileInfo from './profile/profile-info';
import TaskStats from './profile/profile-task-stats';
import TotalPoints from './profile/profile-points';

export default function ProfileSection() {
  const { name, email, setName, setEmail, tasks, totalPoints } = useProfileStore();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <Card className="bg-card text-card-foreground">
        <CardContent className="pt-6" style={{ padding: '2.3rem 1.5rem 2.5rem 1.5rem'}}>
          <div className="flex flex-col space-y-6">
            <ProfileInfo 
              name={name || 'Default Name'} 
              email={email || 'default@example.com'} 
              setName={setName} 
              setEmail={setEmail} 
            />
            <TaskStats tasks={tasks} />
            <TotalPoints totalPoints={totalPoints} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}