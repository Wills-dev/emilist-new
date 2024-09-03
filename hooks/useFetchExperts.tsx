import { useQuery } from "react-query";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useFetchExperts = () => {
  const onError = (error: any) => {
    if (error) {
      console.log("error fetching services", error);
    }
  };

  const getAllExperts = () => {
    return axiosInstance.get("/fetchexperts").then((res) => res?.data);
  };

  const { data: allExperts, isLoading: loading } = useQuery(
    "all experts",
    getAllExperts,
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
    allExperts,
  };
};
