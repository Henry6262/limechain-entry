'use client'

import { Activity, ChevronRight, Hash } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RecentActivityProps {
  transactionCount?: number;
}

export default function RecentActivity({ transactionCount }: RecentActivityProps) {
  const activities = [
    { type: 'Swap', amount: '100 EXT', time: '2h ago' },
    { type: 'Transfer', amount: '0.5 ETH', time: '5h ago' },
    { type: 'Mint NFT', amount: '#1337', time: '1d ago' },
  ]

  return (
    <Card className="border-none bg-gray-900 overflow-hidden shadow-lg">
      <CardHeader className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center text-white">
            <Activity className="h-6 w-6 mr-2 text-purple-400" />
            Recent Activity
          </CardTitle>
          <div className="flex items-center text-sm text-gray-400">
            <Hash className="h-5 w-5 mr-2 text-purple-400" />
            <span>Total: {transactionCount ?? 'Loading...'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {activities.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.type}</p>
                  <p className="text-xs text-gray-400">{item.amount}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-2">{item.time}</span>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}