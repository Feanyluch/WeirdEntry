// ProductTabs.tsx
import React from 'react';

interface ProductTabsProps {
  // Add any props needed for your ProductTabs
}

const ProductTabs: React.FC<ProductTabsProps> = () => {
  return (
    <div className="ProductTabs flex items-start gap-4 text-sm text-[#1B2E3C80]">
        <h2>All (203)</h2>
        <h2>Published (203)</h2>
        <h2>Drafts (203)</h2>
        <h2>On Discount (203)</h2>
    </div>
  );
};

export default ProductTabs;
