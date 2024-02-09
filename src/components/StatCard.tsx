// StatCard.tsx

import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col bg-gray-200 rounded-lg items-start justify-start p-4 gap-1">
      <h2 className="text-sm">{title}</h2>
      <span className="font-bold text-xl">{value}</span>
    </div>
  );
};

export default StatCard;