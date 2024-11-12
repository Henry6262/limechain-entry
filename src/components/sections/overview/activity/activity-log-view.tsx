'use client'

import React, { useState } from 'react'
import { useProfileStore } from '@/store/useProfileStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {ActivityType } from '@/types/types'
import { ChevronLeft, ChevronRight, FileText, Lock, Search, Clock } from 'lucide-react'
import ActivityLogItem from './activity-log-item'

const ITEMS_PER_PAGE = 5

const ActivityLogView: React.FC = () => {
  const activities = useProfileStore((state) => state.activities)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const sortedActivities = [...activities].sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())

  const totalPages = Math.ceil(sortedActivities.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = sortedActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'task':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'auth':
        return <Lock className="h-5 w-5 text-green-500" />
      case 'fetch token':
        return <Search className="h-5 w-5 text-purple-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
      case 'login':
        return 'bg-green-500'
      case 'complete':
      case 'logout':
        return 'bg-blue-500'
      case 'update':
      case 'update profile':
        return 'bg-yellow-500'
      case 'search':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const formatTimeAgo = (datetime: string) => {
    const now = new Date()
    const past = new Date(datetime)
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  return (
    <Card className="w-full bg-transparent border-none">
      <CardContent className="p-[0]">
        <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
        <div className="space-y-4">
          {currentItems.map((item) => (
            <ActivityLogItem
              key={item.id}
              item={item}
              isExpanded={expandedItems.includes(item.id.toString())}
              toggleExpansion={() => toggleItemExpansion(item.id.toString())}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ActivityLogView