// ParentComponent.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import ProductTab from './ProductTab';
import StatCard from './StatCard';

const ParentComponent: React.FC = () => {
    const statData = [
        { title: "Total Product", value: "2053" },
        { title: "Shirts", value: "23" },
        { title: "Trousers", value: "1002" },
        { title: "Cargo Pants", value: "32" },
        { title: "Total Product", value: "2053" },
        { title: "Shirts", value: "23" },
        { title: "Trousers", value: "1002" },
        { title: "Cargo Pants", value: "32" },
        { title: "Total Product", value: "2053" },
        { title: "Shirts", value: "23" },
        { title: "Trousers", value: "1002" },
        { title: "Cargo Pants", value: "32" },
      ];

  return (
    <div className="mx-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold uppercase">Inventory</h2>
            <span>Manage your inventory</span>
          </div>
        </div>
    <div className="grid grid-cols-4 gap-4 my-6">
    {statData.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} />
          ))}
    </div>
    </div>
  );
};

export default ParentComponent;
