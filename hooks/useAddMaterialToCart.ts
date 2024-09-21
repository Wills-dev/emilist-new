import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import toast from "react-hot-toast";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import { promiseErrorFunction, toastOptions } from "@/helpers";

export const useAddMaterialToCart = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [cartLoading, setCartLoading] = useState(false);

  const addMaterialToCart = async (materialId: string) => {
    setCartLoading(true);
    if (!currentUser) {
      router.push("/login");
    }
    try {
      const cartPayload = {
        quantity: 1,
        material_id: materialId,
        user_id: currentUser.unique_id,
      };
      const data = await axiosInstance.post(`/addToCart`, cartPayload);
      console.log("data", data);
      toast("Material added to cart", toastOptions);
    } catch (error: any) {
      console.log("error on add to cart", error);
      promiseErrorFunction(error);
    } finally {
      setCartLoading(false);
    }
  };

  return {
    addMaterialToCart,
    cartLoading,
  };
};
