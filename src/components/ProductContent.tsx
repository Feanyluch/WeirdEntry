// ParentComponent.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Table from './Table';
import ProductTab from './ProductTab';

const ParentComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://weird-entry-lara-production.up.railway.app/api/product');
        setData(response.data.data); // Assuming the data is an array, adjust accordingly
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleEdit = (item: any) => {
    // Implement edit logic
    console.log('Edit item:', item);
  };

  const handleDelete = (item: any) => {
    // Implement delete logic
    console.log('Delete item:', item);
    // Update state or make an API call to update data
  };

  const handleClick = () => {
    router.push("/add-product")
  }

  return (
    <div className="mx-12 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Products</h2>
            <ProductTab />
          </div>
          <div className="flex gap-2">
            <button className="bg-[#1b2e3c] px-4 py-3 text-[#F3E3E2] rounded-lg text-sm" onClick={handleClick}>
              + {" "}Add Product
            </button>
          </div>
        </div>
    <div className="flex items-center justify-center my-6">
      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
    </div>
  );
};

export default ParentComponent;
