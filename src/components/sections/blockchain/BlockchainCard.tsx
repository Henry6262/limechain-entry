import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface BlockchainCardProps {
  title: string;
  icon: ReactNode;
  value: ReactNode;
  subValue?: ReactNode;
  action?: ReactNode;
}

export default function BlockchainCard({ title, icon, value, subValue, action }: BlockchainCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="p-4 flex-row border-b flex justify-between items-center">
        <CardTitle className="text-sm font-medium flex items-center ">
          <span className="mr-2 text-purple-400">{icon}</span>
          {title}
        </CardTitle>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-2xl font-bold transition-colors">
          {value}
        </div>
        {subValue && (
          <div className="mt-2 text-sm flex items-center">
            {subValue}
          </div>
        )}
      </CardContent>
    </Card>
  )
}