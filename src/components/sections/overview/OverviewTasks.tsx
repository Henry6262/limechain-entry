'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TaskItem from './task/TaskItem'
import TaskCreation from './task/TaskCreation'
import { Task } from '@/types/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface OverviewTasksProps {
  tasks: Task[]
}

export default function OverviewTasks({ tasks }: OverviewTasksProps) {
  const [taskFilter, setTaskFilter] = useState('all')
  const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'all') return true
    if (taskFilter === 'inProgress') return task.status === 'In Progress'
    if (taskFilter === 'completed') return task.status === 'Completed'
    return false
  })

  const openTaskCreationModal = () => setIsTaskCreationModalOpen(true)
  const closeTaskCreationModal = () => setIsTaskCreationModalOpen(false)

  return (
    <div className="mb-8 w-full relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Tasks</h2>

      </div>
      <Carousel >
        <div className="flex justify-between items-center mb-2">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`bg-gray-800 hover:bg-gray-700 ${taskFilter === 'all' ? 'bg-purple-500' : ''}`}
              onClick={() => setTaskFilter('all')}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`bg-gray-800 hover:bg-gray-700 ${taskFilter === 'inProgress' ? 'bg-purple-500' : ''}`}
              onClick={() => setTaskFilter('inProgress')}
            >
              In Progress
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`bg-gray-800 hover:bg-gray-700 ${taskFilter === 'completed' ? 'bg-purple-500' : ''}`}
              onClick={() => setTaskFilter('completed')}
            >
              Completed
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-purple-500  hover:bg-purple-600" style={{height: 'auto'}}
              onClick={openTaskCreationModal}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <CarouselPrevious className='relative top-[0] left-[0] translate-y-0 text-black' />
            <CarouselNext className='relative top-[0] right-[0] translate-y-0 text-black' />
          </div>
        </div>
        <CarouselContent className="-ml-4">
          {filteredTasks.map((task) => (
            <CarouselItem key={task.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-1">
                <TaskItem task={task} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <TaskCreation
        isOpen={isTaskCreationModalOpen}
        onClose={closeTaskCreationModal}
      />
    </div>
  )
}