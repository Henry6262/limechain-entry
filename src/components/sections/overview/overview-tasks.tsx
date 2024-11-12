'use client'

import React, { useState } from 'react'
import TaskItem from './task/task-item'
import TaskCreation from './task/task-creation'
import { Task } from '@/types/types'
import TaskFilters from './task/task-filters'
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
  const [taskTypeFilter, setTaskTypeFilter] = useState<'all' | 'manual' | 'quest'>('all')
  const [isTaskCreationModalOpen, setIsTaskCreationModalOpen] = useState(false)

  const filteredTasks = tasks.filter(task => {
    const statusMatch = taskFilter === 'all' || task.status === taskFilter
    const typeMatch = taskTypeFilter === 'all' || task.taskType === taskTypeFilter
    return statusMatch && typeMatch
  })

  

  const openTaskCreationModal = () => setIsTaskCreationModalOpen(true)
  const closeTaskCreationModal = () => setIsTaskCreationModalOpen(false)

  return (
    <div className="mb-8 w-full relative">
      <div className="flex justify-between items-center mb-4">
      </div>
      <Carousel>
        <div className="flex justify-between items-center mb-2">
        <TaskFilters
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
          taskTypeFilter={taskTypeFilter}
          setTaskTypeFilter={setTaskTypeFilter}
          openTaskCreationModal={openTaskCreationModal}
        />
          <div className="flex gap-2">
            <CarouselPrevious className='relative top-[0] text-black  dark:text-white left-[0] translate-y-0 ' />
            <CarouselNext className='relative top-[0] text-black  dark:text-white right-[0] translate-y-0 ' />
          </div>
        </div>
        <CarouselContent className="-ml-4 pt-4">
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
  );
}