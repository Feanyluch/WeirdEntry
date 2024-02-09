import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FavoriteItem } from "@/redux/types";
import Image from "next/image";
// import { FavoriteItem } from "@/redux/favoriteSlice";

interface FavoriteTableProps {
  onRemoveFavorite: (productId: number) => void;
}

const FavoriteTable: React.FC<FavoriteTableProps> = ({ onRemoveFavorite }) => {
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);
  console.log({ favoriteItems });

  return (
    <table
      width="100%"
      className="max-w-[1200px] mx-auto px-8 my-8 border-b border-b-gray-500"
    >
      <thead className="border-b border-b-gray-500">
        <tr className="pb-8">
          <th className="text-left">Product</th>
          <th className="text-left">Price</th>
          <th className="text-left">Status</th>
          <th className="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {favoriteItems.map((favoriteProduct: FavoriteItem) => (
          <tr
            key={favoriteProduct.id}
          >
            <td className="flex gap-4 py-4">
              <Image
                src={favoriteProduct.product_image}
                alt={favoriteProduct.id.toString()}
                width={50}
                height={50}
              />
              {favoriteProduct.title}
            </td>
            <td className="py-4">
              {favoriteProduct.sales_price ? (
                <div className="flex gap-4">
                  <span className="text-gray-500 line-through">
                    ₦ {favoriteProduct.price.toLocaleString()}
                  </span>{" "}
                  <strong>
                    ₦ {favoriteProduct.sales_price.toLocaleString()}
                  </strong>
                </div>
              ) : (
                <>₦ {favoriteProduct.price.toLocaleString()}</>
              )}
            </td>
            <td className="py-4">In stock</td>{" "}
            {/* Example status, replace with actual product status */}
            <td className="py-4">
              <button
                onClick={() => onRemoveFavorite(favoriteProduct.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FavoriteTable;
