import React from "react";
import FileUpload from "./FileUpload";

const AddProduct: React.FC = () => {

  return (
    <div className="mx-12 py-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-xl">Add Products</h2>
        <p>
          The details filled in the form will be displayed publicly to your
          customers
        </p>
      </div>
      <div className="bg-white p-8 my-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Product Name</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Category</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Price</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Quantity</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Color</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Size</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
        </div>
        <div className="my-2">
          <label className="text-[#1B2E3C80] text-xs">Description</label>
          <textarea className="w-full h-24 bg-[#1B2E3C0D] outline-none p-2" />
        </div>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Tax</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Discount Type</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
            
          </div>
          <div className="flex flex-col">
            <label className="text-[#1B2E3C80] text-xs">Status</label>
            <input
              type="text"
              className="rounded px-2 bg-[#1B2E3C0D] h-[40px] outline-none capitalize text-sm"
            />
          </div>
        </div>
      <FileUpload />
      </div>
      <div className="flex items-center justify-center gap-4 mt-16">
        <button className="border uppercase text-xs border-[#1B2E3C] w-32 px-2 py-3 rounded-lg">
          Draft
        </button>
        <button className="border uppercase text-xs bg-[#1B2E3C] text-[#F3E3E2] w-32 px-2 py-3 rounded-lg">
          upload
        </button>
        <button className="border uppercase text-xs bg-red-600 text-[#F3E3E2] w-32 px-2 py-3 rounded-lg">
          Draft
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
