import { RootState } from "@/redux/store";
import axios from "axios";
import { useSelector } from "react-redux";

export const useRemoveFromWishlist = () => {
    const user = useSelector((state: RootState) => state.auth.user);
  
    const removeFromWishlist = async (productIdToRemove: any) => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const productEndpoint = "wishlist/remove";
        const apiUrl = `${apiBaseUrl}${productEndpoint}`;
        const response = await axios.post(
          apiUrl,
          {
            product_id: productIdToRemove,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          console.log("Removed from wishlist successfully");
        } else {
          console.error("Failed to remove from wishlist:", response.statusText);
        }
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    };
  
    return removeFromWishlist;
  };