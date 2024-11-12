import { Award } from 'lucide-react';

interface TotalPointsProps {
  totalPoints: number;
}

export default function TotalPoints({ totalPoints }: TotalPointsProps) {
  return (
    <div className="relative p-6 bg-primary text-primary-foreground rounded-lg overflow-hidden">
      <Award className="absolute top-4 right-4 h-16 w-16 opacity-20" />
      <p className="text-sm font-medium mb-1">Total Points</p>
      <p className="text-4xl font-bold">{totalPoints}</p>
    </div>
  );
}