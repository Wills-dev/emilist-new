"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { Popconfirm, PopconfirmProps } from "antd";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Pagination from "react-responsive-pagination";

import { dashboardLinks } from "@/constants";
import { useSaveJob } from "@/hooks/useSaveJob";
import { useUnsaveJob } from "@/hooks/useUnSaveJob";
import { useBlackListJob } from "@/hooks/useBlackListJob";
import { useFetchJobs } from "@/hooks/useFetchJobs";
import { useGetUserSavedJobs } from "@/hooks/useGetUserSavedJobs";
import {
  Capitalize,
  formatCreatedAt,
  numberWithCommas,
  showLastPathOfLink,
} from "@/helpers";

const DashboardJobContent = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const { handleSaveJob, rerender } = useSaveJob();
  const { handleUnsaveJob, unsaveRerenderr } = useUnsaveJob();
  const { handleBlackListJob, rerenderrr } = useBlackListJob();
  const { saveLoading, allUserSavedJobs, getAllUserSavedJobs } =
    useGetUserSavedJobs();

  const {
    isLoading,
    allJobs,
    allJobsData,
    search,
    handleChange,
    handlePageChange,
    totalPages,
    currentPage,
    getAllJobs,
  } = useFetchJobs();

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };

  useEffect(() => {
    getAllJobs();
    getAllUserSavedJobs();
  }, [rerender, unsaveRerenderr, rerenderrr]);

  const isSaved = (job: any) =>
    allUserSavedJobs?.some((savedJob: any) => savedJob.id === job.Id);

  return (
    <div className="col-span-7 max-lg:col-span-10 w-full bg-white p-6 rounded-lg max-sm:px-3">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-2xl font-medium max-sm:text-lg">
          Explore Emilist
        </h2>
      </div>
      <div className="flex flex-col w-full gap-4 border-b-1 border-[#B8B9B8]">
        <div className="flex-c-b w-full mt-6 gap-2">
          <ul className="flex-c gap-4 max-sm:hidden">
            {dashboardLinks.map((link) => (
              <Link
                href={link.link}
                key={link.id}
                className={`${
                  pathname === link.link
                    ? "text-primary-green  border-b-primary-green border-b-1"
                    : "text-[#737774]"
                }  font-semibold capitalize`}
              >
                <li>{link.name}</li>
              </Link>
            ))}
          </ul>
          <div
            className={`sm:hidden flex-1 max-w-[190px] rounded-lg px-2 flex-c-b relative max-sm:h-[46px] border-1 border-[#D9D9D9]`}
          >
            <div
              className="flex-c gap-3 flex-wrap flex-1 2-full "
              onClick={() => setOpen((prev) => !prev)}
            >
              <p className=" max-sm:text-sm capitalize">
                {showLastPathOfLink(pathname)}
              </p>
            </div>
            <span className="block" onClick={() => setOpen((prev) => !prev)}>
              <IoIosArrowDown />
            </span>
            {open && (
              <ul className="absolute flex flex-col top-full right-0 w-full max-sm:w-full bg-slate-50 shadow justify-center p-2 rounded-md">
                {dashboardLinks.map((link, index) => (
                  <Link
                    href={link.link}
                    key={index}
                    className="w-full hover:bg-gray-200"
                  >
                    <li
                      onClick={() => {
                        setOpen((prev) => !prev);
                      }}
                      className=" max-sm:text-sm  capitalize"
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
          <button className="custom-btn">
            <Link href="/dashboard/job/list-new-job">Post a Job</Link>
          </button>
        </div>
        <div className="flex justify-between w-full sm:gap-8 gap-4 pb-6">
          <div className="flex-1">
            <p className=" max-sm:text-sm">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint.
            </p>
          </div>
          <div className="flex-1 flex-c gap-2 px-2 py-3 rounded-lg border-[#737774] border-1 focus-within:border-primary-green  max-sm:py-1 shadow-lg">
            <button type="submit" className="text-xl">
              {" "}
              <CiSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleChange}
              className="focus:outline-none max-md:text-14 w-full bg-white"
            />
          </div>
        </div>
      </div>
      <>
        {isLoading || saveLoading ? (
          <div className="flex item-center justify-center text-green-500 mt-6 h-[30vh]">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          <>
            {allJobs.length < 1 ? (
              <p className="py-2">No job listed</p>
            ) : (
              <>
                {allJobs.length > 0 && allJobsData.length < 1 ? (
                  <p className="py-2">
                    No result found, try searching for something else
                  </p>
                ) : (
                  <>
                    {allJobsData?.map((job: any, index: number) => (
                      <div
                        className="w-full py-4  border-b-1 border-[#B8B9B8]"
                        key={index}
                      >
                        <div className="w-full pb-5">
                          <h5 className="hover:text-primary-green transition-all sm:text-xl  font-semibold ">
                            <Link
                              href={
                                job?.jobType === "biddable"
                                  ? `/job/info/biddable/${job.Id}`
                                  : `/job/info/regular/${job.Id}`
                              }
                            >
                              {job?.jobTitle && Capitalize(job?.jobTitle)}
                            </Link>
                          </h5>
                        </div>
                        <div className="flex-c-b flex-wrap">
                          <h6 className="text-[#737774] text-sm font-medium max-sm:text-xs">
                            {job?.jobType === "biddable"
                              ? "Max price"
                              : "Budget"}
                            : ₦{job?.Amount && numberWithCommas(job?.Amount)}
                          </h6>

                          <h6 className="text-[#737774] text-sm  font-medium max-sm:text-sm whitespace-nowrap">
                            Date Posted:{" "}
                            {job?.Date && formatCreatedAt(job.Date)}
                          </h6>
                        </div>
                        {job?.Description && job?.Description.length > 300 ? (
                          <p className="text-sm font-medium max-sm:text-sm py-2">
                            {job?.Description.slice(0, 300)}...
                            <Link
                              href={
                                job?.jobType === "biddable"
                                  ? `/job/info/biddable/${job.Id}`
                                  : `/job/info/regular/${job.Id}`
                              }
                              className="underline text-primary-green"
                            >
                              Read more
                            </Link>
                          </p>
                        ) : (
                          <p className="text-sm font-medium max-sm:text-sm py-2">
                            {job?.Description}
                          </p>
                        )}
                        <div className="flex-c gap-10 max-sm:gap-5 ">
                          <h6 className="text-[#737774] text-sm  font-medium max-sm:text-sm max-sm:hidden">
                            Job duration: {job.projectDuration}
                          </h6>
                        </div>
                        <div className="flex-c-b gap-8">
                          <p className="flex-c text-[#737774] font-medium max-sm:text-sm py-2 flex-1 truncate">
                            {" "}
                            <span className="block text-xl mr-1">
                              <IoLocationSharp />
                            </span>
                            {job.Location && Capitalize(job.Location)}
                          </p>
                          <div className="flex-c justify-end gap-10 max-sm:gap-4 ">
                            {isSaved(job) ? (
                              <span
                                className="block text-xl text-pink-500 cursor-pointer"
                                onClick={() => handleUnsaveJob(job.Id)}
                              >
                                <FaHeart />
                              </span>
                            ) : (
                              <span
                                className="block text-xl cursor-pointer"
                                onClick={() => handleSaveJob(job.Id)}
                              >
                                <FaRegHeart />
                              </span>
                            )}
                            <Popconfirm
                              placement="leftTop"
                              title="Block job"
                              description="Are you sure you want to block this job?"
                              onConfirm={() => handleBlackListJob(job?.Id)}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Image
                                src="/assets/icons/flag.svg"
                                alt="menu"
                                width={20}
                                height={20}
                                className="object-contain w-6 h-6 max-sm:w-5 max-sm:h-5 cursor-pointer"
                              />
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="md:w-2/3 w-full">
                      <Pagination
                        current={currentPage}
                        total={totalPages}
                        onPageChange={handlePageChange}
                        extraClassName="justify-content-start"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default DashboardJobContent;
