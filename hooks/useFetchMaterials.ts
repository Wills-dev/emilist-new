import { useQuery } from "react-query";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useFetchMaterials = () => {
  const onError = (error: any) => {
    if (error) {
      console.log("error fetching materials", error);
    }
  };

  const getAllMaterials = () => {
    return axiosInstance.get("/fetchMaterials").then((res) => res?.data);
  };

  const { data: allMaterials, isLoading: loading } = useQuery(
    "all materials",
    getAllMaterials,
    {
      onError: onError,
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    loading,
    allMaterials,
  };
};
