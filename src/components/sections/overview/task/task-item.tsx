'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Trophy, Clipboard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Task } from '@/types/types'
import { useProfileStore } from '@/store/useProfileStore'
import { addActivity } from '@/utils/userActivityHandler'

interface TaskItemProps {
  task: Task
}

const statusConfig = {
  'Not Started': {
    borderColor: 'border-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950',
    textColor: 'text-red-700 dark:text-red-300',
    hoverBg: 'hover:bg-red-100 dark:hover:bg-red-900',
    progressColor: 'bg-red-500',
  },
  'In Progress': {
    borderColor: 'border-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    hoverBg: 'hover:bg-yellow-100 dark:hover:bg-yellow-900',
    progressColor: 'bg-yellow-500',
  },
  'Completed': {
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950',
    textColor: 'text-green-700 dark:text-green-300',
    hoverBg: 'hover:bg-green-100 dark:hover:bg-green-900',
    progressColor: 'bg-green-500',
  },
} as const

export default function TaskItem({ task }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(task.status)
  const { updateTaskStatus } = useProfileStore()

  useEffect(() => {
    setCurrentStatus(task.status)
  }, [task.status])

  const handleStatusChange = (newStatus: 'Not Started' | 'In Progress' | 'Completed') => {
    const prevStatus = currentStatus
    setCurrentStatus(newStatus)
    updateTaskStatus(task.id, newStatus)

    addActivity({
      type: 'task',
      action: newStatus === 'Completed' ? 'complete' : 'update',
      datetime: new Date().toISOString(),
      details: `${prevStatus} -> ${newStatus}`,
    })
  }

  const TabButton = ({ status, onClick, children }: { status: 'Not Started' | 'In Progress' | 'Completed', onClick: () => void, children: React.ReactNode }) => (
    <motion.button
      className={`px-3 py-1.5 rounded-md text-xs font-medium ${statusConfig[status].textColor} ${currentStatus === status ? statusConfig[status].bgColor : 'bg-transparent'} ${statusConfig[status].hoverBg} transition-colors duration-200`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )

  return (
    <Card className={`relative w-full border-l-4 ${statusConfig[currentStatus].borderColor} transition-all duration-300 ${statusConfig[currentStatus].bgColor}`}>
      <Badge 
        variant="secondary" 
        className={`absolute -top-3 left-4 ${task.taskType === 'quest' ? 'bg-purple-600 dark:bg-purple-400' : 'bg-blue-600 dark:bg-blue-400'} text-white z-10`}
      >
        {task.taskType === 'quest' ? (
          <Trophy className="mr-1" size={14} />
        ) : (
          <Clipboard className="mr-1" size={14} />
        )}
        {task.taskType.charAt(0).toUpperCase() + task.taskType.slice(1)}
      </Badge>
      <CardContent className="p-4 pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate pr-8 flex-grow text-gray-900 dark:text-gray-100">{task.title}</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${statusConfig[currentStatus].textColor} ${statusConfig[currentStatus].hoverBg} rounded-full p-1 transition-colors duration-200`}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse task details" : "Expand task details"}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <motion.div
            key={currentStatus}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Badge variant="outline" className={`${statusConfig[currentStatus].textColor} ${statusConfig[currentStatus].borderColor}`}>
              {currentStatus}
            </Badge>
          </motion.div>
          <Badge variant="secondary" className="bg-purple-600 dark:bg-purple-400 text-white">
            {task.points} pts
          </Badge>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{task.description}</p>
              {task.taskType === 'quest' ? (
                <div className="space-y-2">
    
                  {currentStatus !== 'Completed' && (
                    <Button 
                      className={`w-full mt-2 ${statusConfig[currentStatus].bgColor} ${statusConfig[currentStatus].textColor} ${statusConfig[currentStatus].hoverBg} border border-current`}
                    >
                      {currentStatus === 'Not Started' ? 'Start Quest' : 'Continue Quest'}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex justify-end space-x-2">
                  <TabButton
                    status={currentStatus === 'Completed' ? 'Not Started' : 'In Progress'}
                    onClick={() => handleStatusChange(currentStatus === 'Completed' ? 'Not Started' : 'In Progress')}
                  >
                    {currentStatus === 'Completed' ? 'Reset' : 'Start'}
                  </TabButton>
                  <TabButton
                    status="Completed"
                    onClick={() => handleStatusChange('Completed')}
                  >
                    Complete
                  </TabButton>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}