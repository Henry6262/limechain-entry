'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { useProfileStore } from '@/store/useProfileStore'
import { Button } from '@/components/ui/button'
import { completeQuest } from '@/utils/questCompletionHandler'; // Import the utility function
import { addActivity } from '@/utils/userActivityHandler'; // Import the activity handler

export default function ProfileSection() {
  const { name, email, setName, setEmail, tasks } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);

  // Calculate task statistics
  const taskStats = {
    completed: tasks.filter(task => task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    notStarted: tasks.filter(task => task.status === 'Not Started').length,
  };

  const handleSaveProfile = () => {
    if (name && email) {
      // Complete the "Complete Profile Information" quest
      completeQuest(1);

      // Log the profile update activity
      addActivity({
        type: 'auth',
        action: 'update profile',
        datetime: new Date().toISOString(),
        details: `Name: ${name}, Email: ${email}`,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Profile</h2>
      </div>
      <Card className="bg-gray-900 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <motion.div layout className="flex items-center space-x-2">
                <User className="text-gray-400 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <span className="text-lg">{name}</span>
                )}
              </motion.div>
              <motion.div layout className="flex items-center space-x-2">
                <Mail className="text-gray-400 flex-shrink-0" />
                {isEditing ? (
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                ) : (
                  <span className="text-lg">{email}</span>
                )}
              </motion.div>
            </div>
            <Switch
              checked={isEditing}
              onCheckedChange={setIsEditing}
              className="data-[state=checked]:bg-purple-500"
            />
            {isEditing && (
              <Button onClick={handleSaveProfile} className="bg-purple-500 hover:bg-purple-600">
                Save
              </Button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-lg font-semibold">{taskStats.completed}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-yellow-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-lg font-semibold">{taskStats.inProgress}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">Not Started</p>
                <p className="text-lg font-semibold">{taskStats.notStarted}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}