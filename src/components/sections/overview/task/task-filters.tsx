'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Plus, ListFilter, CheckSquare } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskFiltersProps {
  taskFilter: string
  setTaskFilter: (filter: string) => void
  taskTypeFilter: 'all' | 'manual' | 'quest'
  setTaskTypeFilter: (filter: 'all' | 'manual' | 'quest') => void
  openTaskCreationModal: () => void
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  taskFilter,
  setTaskFilter,
  taskTypeFilter,
  setTaskTypeFilter,
  openTaskCreationModal,
}) => {
  return (
    <div className="flex items-center space-x-2 rounded-lg shadow-sm">
      <div className="hidden sm:block">
        <Tabs value={taskFilter} onValueChange={setTaskFilter} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Not Started">Not Started</TabsTrigger>
            <TabsTrigger value="In Progress">In Progress</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <CheckSquare className="h-4 w-4 text-black  dark:text-white" />
              <span className="sr-only">Filter by status</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Task Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup 
              value={taskFilter} 
              onValueChange={setTaskFilter}
            >
              <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Not Started">Not Started</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="In Progress">In Progress</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <ListFilter className="h-4 w-4 text-black  dark:text-white" />
            <span className="sr-only">Filter by type</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Task Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={taskTypeFilter} 
            onValueChange={(value: string) => setTaskTypeFilter(value as 'all' | 'manual' | 'quest')}
          >
            <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="manual">Manual</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="quest">Quest</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="default"
        size="icon"
        onClick={openTaskCreationModal}
        className="bg-primary hover:bg-primary/90"
      >
        <Plus className="h-4 w-4 text-black  dark:text-white" />
        <span className="sr-only">Create new task</span>
      </Button>
    </div>
  )
}

export default TaskFilters