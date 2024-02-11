import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FavoriteItem } from "@/redux/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
// import { FavoriteItem } from "@/redux/favoriteSlice";

interface FavoriteTableProps {
  onRemoveFavorite: (productId: number) => void;
}

const FavoriteTable: React.FC<FavoriteTableProps> = ({ onRemoveFavorite }) => {
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);

  const user = useSelector((state: RootState) => state.auth.user);

  const wishlistItems = useSelector((state: RootState) => state.favorite.items);

  const [wishlistData, setWishlistData] = useState<FavoriteItem[]>([]); // State for wishlist data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState("");
  console.log({ favoriteItems });

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        if (user?.token) {
          // Fetch wishlist data from the database endpoint
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
          const wishlistEndpoint = "wishlist";

          const apiUrl = `${apiBaseUrl}${wishlistEndpoint}`;
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          });

          if (response.status === 400) {
            // If response status is 400, show the empty wishlist content
            setWishlistData([]);
            setLoading(false);
            return; // Exit the function early to prevent further execution
          }

          const itemsArray = response.data;
          setWishlistData(itemsArray);
        } else {
          // Use wishlist data from the Redux store for non-logged-in users
          setWishlistData(wishlistItems as FavoriteItem[]);
        }

        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching wishlist data:", error);
        setError(`Error fetching wishlist data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchWishlistData();
    console.log("Raw wishlistData:", wishlistData);
  }, [user?.token, wishlistItems]);

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
        {wishlistData.map((favoriteProduct: FavoriteItem) => (
          <tr key={favoriteProduct.id}>
            <td className="flex gap-4 py-4">
              <Image
                src={favoriteProduct.products.product_image}
                alt={favoriteProduct.id.toString()}
                width={50}
                height={50}
              />
              {favoriteProduct.products.title}
            </td>
            <td className="py-4">
              {favoriteProduct.products.sales_price ? (
                <div className="flex gap-4">
                  <span className="text-gray-500 line-through">
                    ₦ {favoriteProduct.products.price.toLocaleString()}
                  </span>{" "}
                  <strong>
                    ₦ {favoriteProduct.products.sales_price.toLocaleString()}
                  </strong>
                </div>
              ) : (
                <>₦ {favoriteProduct.products.price.toLocaleString()}</>
              )}
            </td>
            <td className="py-4">In stock</td>{" "}
            {/* Example status, replace with actual product status */}
            <td className="py-4">
              <button
                onClick={() => onRemoveFavorite(favoriteProduct.product_id)}
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
