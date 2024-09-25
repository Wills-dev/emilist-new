"use client";

import Image from "next/image";
import { useContext, useEffect } from "react";

import { AuthContext } from "@/utils/AuthState";
import { useGetJobByStatus } from "@/hooks/useGetJobByStatus";

const PausedJobs = () => {
  const { currentUser, userLoading } = useContext(AuthContext);
  const {
    isLoading,
    allJobs,
    allJobsData,
    search,
    handleChange,
    getAllJobsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  } = useGetJobByStatus();

  useEffect(() => {
    if (currentUser) {
      getAllJobsByStatus(currentUser.unique_id, "paused");
    }
  }, [currentUser]);

  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      <div className="col-span-2 w-full min-w-full max-md:col-span-3 border-1 border-[#D0CFCF] rounded-lg p-6 max-sm:px-3 flex-c-b max-md:flex-col gap-4 max-md:justify-start max-md:items-start">
        <div className="flex ">
          <h6 className="sm:text-xl font-semibold">
            Interior painter for a 3bed room flat
          </h6>
        </div>
        <div className="rounded-xl flex-c justify-end gap-8 max-sm:gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-[#5E625F]  sm:text-sm font-medium max-sm:text-xs whitespace-nowrap">
              Milestone
            </p>
            <h6 className="font-bold max-sm:text-sm  whitespace-nowrap">1/4</h6>
          </div>

          <div className="flex-c flex-col gap-2">
            <p className="text-[#5E625F]  sm:text-sm font-medium text-xs whitespace-nowrap">
              Paused
            </p>
            <div className=" flex-c justify-center bg-[#FFF5EB] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-xl">
              <Image
                src="/assets/icons/pause.svg"
                alt="menu"
                width={20}
                height={24}
                className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className=" flex-c justify-center bg-[#F0FDF5] w-[74px] h-[30px] max-sm:h-[25px] max-sm:w-[55px] rounded-xl">
              <p className="text-primary-green  text-xs font-medium whitespace-nowrap">
                Activate
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PausedJobs;
