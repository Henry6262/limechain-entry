import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BlockchainCardProps {
  title: string;
  icon: ReactNode;
  value: ReactNode;
  subValue?: ReactNode;
}

export default function BlockchainCard({ title, icon, value, subValue }: BlockchainCardProps) {
  return (
    <Card className="border-none bg-gray-900 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-4 border-b border-gray-800">
        <CardTitle className="text-sm font-medium flex items-center text-gray-400">
          <span className="mr-2 text-purple-400">{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-2xl font-bold text-white transition-colors">
          {value}
        </div>
        {subValue && (
          <div className="mt-2 text-sm text-gray-500 flex items-center">
            {subValue}
          </div>
        )}
      </CardContent>
    </Card>
  )
}