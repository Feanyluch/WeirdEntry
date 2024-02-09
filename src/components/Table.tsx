// Table.tsx
import React from "react";
import Dropdown from "./TableDropdown";
import formatDate from "../utils/FormatDate";

interface TableProps {
  data: any[]; // Change this based on your data structure
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const Table: React.FC<TableProps> = ({ data, onEdit, onDelete }) => {
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return null; // or display an error message, or a loading spinner, etc.
  }
  return (
    <div className="bg-white my-2 px-8 py-4">
      <table className="w-full border-gray-200 divide-y divide-gray-300">
        <thead className="">
          <tr>
            {/* Adjust column headers based on your data structure */}
            {/* <th className="py-2 px-4">ID</th> */}
            <th className="py-2 uppercase px-4 text-sm">Product Name</th>
            <th className="py-2 uppercase px-4 text-sm">Price</th>
            <th className="py-2 uppercase px-4 text-sm">Category</th>
            <th className="py-2 uppercase px-4 text-sm">Date Added</th>
            <th className="py-2 uppercase px-4 text-sm">Sales Price</th>
            {/* Add more headers as needed */}
            <th className="py-2 uppercase px-4 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className=" border-b border-gray-500">
              {/* <td className="py-2 px-4">{item.id}</td> */}
              <td className="py-2 px-4 flex items-center gap-4 text-sm"><img src={item.product_image} alt="" className="w-12 h-12" />{item.title}</td>
              <td className="py-2 px-4 text-sm">{item.price}</td>
              <td className="py-2 px-4 text-sm">{item.category.title}</td>
              <td className="py-2 px-4 text-sm">{formatDate(item.created_at)}</td>
              <td className="py-2 px-4 text-sm">{item.sales_price}</td>

              {/* Add more columns as needed */}
              <td className="py-2 px-4">
                <Dropdown
                  onEdit={() => onEdit(item)}
                  onDelete={() => onDelete(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
