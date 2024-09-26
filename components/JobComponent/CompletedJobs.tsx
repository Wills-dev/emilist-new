import { useContext, useEffect } from "react";

import Pagination from "react-responsive-pagination";

import { AuthContext } from "@/utils/AuthState";
import { useGetJobByStatus } from "@/hooks/useGetJobByStatus";

const CompletedJobs = () => {
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
    <>
      {isLoading || userLoading ? (
        <div className="flex item-center justify-center text-green-500 mt-6 h-[40vh] w-full">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5 mt-10">
          {allJobs.length < 1 ? (
            <div className="">
              <h6 className="sm:text-xl"> No paused job</h6>
              <p className="max-sm:text-sm">
                Keep track of all paused jobs here.
              </p>
            </div>
          ) : (
            <>
              <div className="col-span-2 w-full min-w-full max-md:col-span-3 border-[1px] border-[#D0CFCF] rounded-[10px] p-6 max-sm:px-3 flex justify-between items-center max-md:flex-col gap-4 max-md:justify-start max-md:items-start">
                <div className="flex ">
                  <h6 className="text-[#030A05]  text-[20px] font-[600] leading-[28px] max-sm:text-[16px] max-sm:leading-[20px]">
                    Interior painter for a 3bed room flat
                  </h6>
                </div>
                <div className="rounded-[20px] flex justify-end items-center gap-8 max-sm:gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                      Milestone
                    </p>
                    <h6 className="text-[#303632]  text-[16px] font-[700] leading-[24px] max-sm:text-[13px]  whitespace-nowrap">
                      1/2
                    </h6>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                      Task
                    </p>
                    <div className=" flex items-center justify-center bg-[#F0FDF5] w-[85px] h-[30px] max-sm:h-[25px] max-sm:w-[70px] rounded-[20px]">
                      <p className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                        Completed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                      Payment status
                    </p>
                    <div className=" flex items-center justify-center bg-[#F0FDF5] w-[85px] h-[30px] max-sm:h-[25px] max-sm:w-[70px] rounded-[20px]">
                      <p className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                        Paid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 w-full min-w-full max-md:col-span-3 border-[1px] border-[#D0CFCF] rounded-[10px] p-6 max-sm:px-3 flex justify-between items-center max-md:flex-col gap-4 max-md:justify-start max-md:items-start">
                <div className="flex ">
                  <h6 className="text-[#030A05]  text-[20px] font-[600] leading-[28px] max-sm:text-[16px] max-sm:leading-[20px]">
                    Interior painter for a 3bed room flat
                  </h6>
                </div>
                <div className="rounded-[20px] flex justify-end items-center gap-8 max-sm:gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                      Milestone
                    </p>
                    <h6 className="text-[#303632]  text-[16px] font-[700] leading-[24px] max-sm:text-[13px]  whitespace-nowrap">
                      2/2
                    </h6>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                      Task
                    </p>
                    <div className=" flex items-center justify-center bg-[#F0FDF5] w-[85px] h-[30px] max-sm:h-[25px] max-sm:w-[70px] rounded-[20px]">
                      <p className="text-[#25C269]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                        Completed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[#5E625F]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                      Payment status
                    </p>
                    <div className=" flex items-center justify-center bg-[#FFF1F2] w-[85px] h-[30px] max-sm:h-[25px] max-sm:w-[70px] rounded-[20px]">
                      <p className="text-[#FF5D7A]  text-[14px] font-[500] leading-[16px] max-sm:text-[12px] whitespace-nowrap">
                        Not Paid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="md:w-2/3 w-full">
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={handlePageChange}
              extraClassName="justify-content-start"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CompletedJobs;
