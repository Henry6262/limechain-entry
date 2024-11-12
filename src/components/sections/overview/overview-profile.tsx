'use client'

import { Card, CardContent } from '@/components/ui/card';
import { useProfileStore } from '@/store/useProfileStore';
import ProfileInfo from './profile/profile-info';
import TaskStats from './profile/profile-task-stats';
import TotalPoints from './profile/profile-points';
import WalletStats from './profile/profile-wallet-stats';

export default function ProfileSection() {
  const { name, email, setName, setEmail, tasks, totalPoints, walletData } = useProfileStore();

  return (
    <Card className="bg-card text-card-foreground">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-6">
          <ProfileInfo name={name} email={email} setName={setName} setEmail={setEmail} />
          <TaskStats tasks={tasks} />
          <TotalPoints totalPoints={totalPoints} />
          {walletData && <WalletStats walletData={walletData} />}
        </div>
      </CardContent>
    </Card>
  );
}