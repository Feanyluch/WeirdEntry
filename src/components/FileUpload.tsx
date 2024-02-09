import React, { useCallback, useState } from "react";

interface ImageWithPreview {
  file: File;
  preview: string;
}

const AddProduct: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<ImageWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);

        // Preview and store selected images
        const imagesWithPreview = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        setSelectedImages((prevImages) => [...prevImages, ...imagesWithPreview]);
      }
    },
    []
  );

  const handleImageDelete = useCallback((index: number) => {
    // Delete the selected image by index
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  }, [selectedImages]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);

        // Preview and store selected images
        const imagesWithPreview = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        setSelectedImages((prevImages) => [...prevImages, ...imagesWithPreview]);
      }
    },
    []
  );

  return (
    <div
      className={`${isDragging ? "border-dashed border-2 border-blue-500" : ""}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Existing code... */}

      <div className="bg-[#1B2E3C0D] h-36 w-full mt-8 mb-4 flex items-center justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
          id="imageInput"
        />
        <label htmlFor="imageInput" className="cursor-pointer">
          <h2 className="text-sm text-[#1B2E3C80]">
            {isDragging ? "Drop the file here" : "Drag and Drop a file to upload"}
          </h2>
        </label>
      </div>

      {/* Preview selected images */}
      <div className="flex flex-wrap gap-4">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.preview}
              alt={`Preview ${index + 1}`}
              className="h-24 w-24 object-cover rounded"
            />
            <button
              onClick={() => handleImageDelete(index)}
              className="absolute top-0 right-0 px-2 py-1 text-sm m-1 bg-red-600 text-[#F3E3E2] p-1 rounded-full"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Existing code... */}
    </div>
  );
};

export default AddProduct;