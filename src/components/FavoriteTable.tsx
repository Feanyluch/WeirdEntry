import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FavoriteItem } from "@/redux/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface CommonFavoriteItem {
  product_id: number;
  title: string;
  price: number;
  sales_price?: number;
  product_image: string;
}

interface FavoriteTableProps {
  onRemoveFavorite: (productId: number) => void;
}

const FavoriteTable: React.FC<FavoriteTableProps> = ({ onRemoveFavorite }) => {
  const favoriteItems = useSelector((state: RootState) => state.favorite.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const wishlistItems = useSelector((state: RootState) => state.favorite.items);
  console.log({ wishlistItems });

  const [wishlistData, setWishlistData] = useState<CommonFavoriteItem[]>([]);
  console.log({ wishlistData });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        if (user?.token) {
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
            setWishlistData([]);
            setLoading(false);
            return;
          }

          const itemsArray: CommonFavoriteItem[] = response.data.map(
            (item: any) => ({
              product_id: item.product_id,
              title: item.products.title,
              price: item.products.price,
              sales_price: item.products.sales_price,
              product_image: item.products.product_image[0],
            })
          );

          console.log({ itemsArray });

          setWishlistData(itemsArray);
        } else {
          // For local storage data, directly use the items from redux store
          const itemsArray: CommonFavoriteItem[] = wishlistItems.map(
            (item: FavoriteItem) => ({
              product_id: item.id,
              title: item.title,
              price: item.price,
              sales_price: item.sales_price,
              product_image: item.product_image[0],
            })
          );

          setWishlistData(itemsArray);
        }

        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching wishlist data:", error);
        setError(`Error fetching wishlist data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [user?.token, wishlistItems]);

  console.log({ wishlistData });

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
        {wishlistData.map((favoriteProduct: CommonFavoriteItem) => (
          <tr key={favoriteProduct.product_id}>
            <td className="flex gap-4 py-4">
              <Image
                src={favoriteProduct.product_image}
                alt="hello"
                width={50}
                height={50}
              />
              {favoriteProduct.title}
            </td>
            <td className="py-4">
              {favoriteProduct.sales_price ? (
                <div className="flex gap-4">
                  <span className="text-gray-500 line-through">
                    ₦ {favoriteProduct.price}
                  </span>{" "}
                  <strong>₦ {favoriteProduct.sales_price}</strong>
                </div>
              ) : (
                <>₦ {favoriteProduct.price}</>
              )}
            </td>
            <td className="py-4">In stock</td>
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
