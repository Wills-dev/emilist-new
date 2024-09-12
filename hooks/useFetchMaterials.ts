import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useFetchMaterials = () => {
  const [allMaterials, setAllMaterials] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllMaterials = async () => {
    try {
      const data = await axiosInstance.get(`/fetchMaterials`);
      setAllMaterials(data?.data);
      const totalJobs = data?.data?.length;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.log("error fetching all materials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMaterials();
  }, []);

  const allMaterialsData = useMemo(() => {
    let computedMaterials = allMaterials;

    if (search) {
      computedMaterials = computedMaterials?.filter(
        (material: any) =>
          material?.businessname
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          material?.country?.toLowerCase().includes(search.toLowerCase()) ||
          material?.firstname?.toLowerCase().includes(search.toLowerCase()) ||
          material?.service?.toLowerCase().includes(search.toLowerCase()) ||
          material?.contactpersonName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          material?.city?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedMaterials?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [allMaterials, currentPage, search]);

  // const onError = (error: any) => {
  //   if (error) {
  //     console.log("error fetching materials", error);
  //   }
  // };

  // const getAllMaterials = () => {
  //   return axiosInstance.get("/fetchMaterials").then((res) => res?.data);
  // };

  // const { data: allMaterials, isLoading: loading } = useQuery(
  //   "all materials",
  //   getAllMaterials,
  //   {
  //     onError: onError,
  //     staleTime: 60 * 60 * 1000,
  //     cacheTime: 60 * 60 * 1000,
  //     refetchOnMount: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  return {
    loading,
    allMaterials,
    allMaterialsData,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
  };
};
