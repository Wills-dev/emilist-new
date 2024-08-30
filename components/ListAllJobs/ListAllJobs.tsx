"use client";

import Link from "next/link";

import Pagination from "react-responsive-pagination";
import { TbShare3 } from "react-icons/tb";
import { HiUser } from "react-icons/hi2";
import { MdLocationOn } from "react-icons/md";

import { useFetchJobs } from "@/hooks/useFetchJobs";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";

const ListAllJobs = () => {
  const {
    isLoading,
    allJobs,
    allJobsData,
    search,
    handleChange,
    getAllJobs,
    handlePageChange,
    totalPages,
    currentPage,
    filterLocation,
    setFilterLocation,
    filterName,
    filterService,
    setFilterName,
    setFilterService,
    handleFilterJob,
    loadFilter,
  } = useFetchJobs();

  console.log("allJobs", allJobs);

  return (
    <section className="padding-y padding-x">
      <div className="grid grid-cols-10 gap-6">
        <div className="col-span-2 max-xl:col-span-3 max-md:hidden">
          <div className="flex flex-col">
            <label htmlFor="filter" className="sm:text-lg font-semibold">
              Filter
            </label>

            <div className="border-[#b8b9b8] border-1 rounded-lg p-2">
              <select
                name=""
                id="filter"
                className="w-full outline-none box-border max-md:text-sm bg-white"
              >
                <option value="contruction"> Construction</option>
                <option value="Software"> Software</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <h6 className=" sm:text-lg font-semibold pt-6">Reviews</h6>
            <div className="">
              <input
                type="text"
                placeholder="Number of Reviews"
                className="border-1 border-[#b8b9b8] rounded-lg w-full max-md:text-sm p-2 bg-white"
              />
            </div>
          </div>
          <div className="w-full border-b-1 border-[#d9d9d9] pb-4">
            <h6 className="sm:text-lg font-semibold pt-6">Location</h6>
            <div className="">
              <input
                type="text"
                placeholder="Location"
                className="border-1 border-[#b8b9b8] rounded-lg w-full max-sm:text-sm p-2 bg-white"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="text-primary-green text-center max-sm:text-sm font-semibold ">
              APPLY
            </button>
          </div>
        </div>
        <div className="col-span-5 max-xl:col-span-7 max-md:col-span-10 w-full">
          <h2 className="text-3xl font-bold max-md:text-lg pb-2 pl-0 ">
            Explore Jobs
          </h2>
          <div className="w-full flex flex-col border-1">
            {allJobsData.map((job: any) => (
              <div
                key={job.Id}
                className="w-full p-4 border-b-1 hover:bg-gray-100 transition-all duration-300"
              >
                <Link href={`/jobs/info/`}>
                  <div className="flex-c-b w-full ">
                    <h5 className="sm:text-lg font-semibold">
                      {job?.jobTitle && Capitalize(job?.jobTitle)}
                    </h5>
                    <div className="flex-c justify-end gap-3 max-sm:gap-2 ">
                      <h6 className="text-sm font-msdium max-sm:text-xs">
                        {job?.Date && formatCreatedAt(job.Date)}
                      </h6>
                    </div>
                  </div>

                  <div className="flex-c-b pt-5 text-[#737774]">
                    <h6 className=" text-sm font-medium max-sm:text-xs">
                      Budget: ₦{job?.Amount && numberWithCommas(job?.Amount)}
                    </h6>
                    <h6 className="text-sm font-medium max-sm:text-xs">
                      Duration: {job?.projectDuration}
                    </h6>
                  </div>
                  {job?.Description && job?.Description.length > 300 ? (
                    <p className="font-medium text-sm py-2">
                      {job?.Description.slice(0, 300)}...
                      <span className="underline text-primary-green">
                        Read more
                      </span>
                    </p>
                  ) : (
                    <p className="font-medium text-sm py-2">
                      {job?.Description}
                    </p>
                  )}
                </Link>
                <div className="flex-c gap-8 flex-wrap max-sm:gap-4 max-sm:justify-between text-[#737774]  font-medium text-sm pt-4">
                  <p className="flex-c gap-1 whitespace-nowrap ">
                    {" "}
                    <span className="text-xl">
                      <MdLocationOn />
                    </span>
                    {job?.Location}
                  </p>
                  <div className="flex-c justify-end gap-1  ">
                    <span className="text-lg">
                      <HiUser />
                    </span>
                    <p className=" whitespace-nowrap ">
                      {job?.noOfApplicants &&
                        numberWithCommas(job?.noOfApplicants)}{" "}
                      {job?.noOfApplicants > 1 ? "Applicants" : "Applicant"}
                    </p>
                  </div>
                  <button className="flex-c gap-1  whitespace-nowrap cursor-pointer hover:text-primary-green transition-all duration-300">
                    <span className="text-xl">
                      <TbShare3 />
                    </span>
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={handlePageChange}
              extraClassName="justify-content-start"
            />
          )}
        </div>
        <div className="col-span-3 max-xl:hidden">
          <div className=" border-1  py-8 rounded-lg">
            <h2 className="text-[20px] text-[#030a05] font-bold max-md:text-[16px] px-6 ">
              Other services for you
            </h2>
            {/* <div className=" flex flex-col gap-5 mt-6">
              {popularServices.slice(0, 2).map((service, index) => (
                <div
                  className="relative w-full h-[150px] border-b-1 px-6 hover:bg-[#0000001a] transition-all py-6"
                  key={index}
                >
                  <Link
                    href="/catalog/expert"
                    className="flex gap-2 w-full h-full "
                  >
                    <Image
                      src={service.imgURL && service.imgURL}
                      alt="logo"
                      width={100}
                      height={100}
                      className="object-cover w-[100px] h-[100px] rounded-full"
                    />
                    <div className="flex flex-col flex-1">
                      <h2 className="text-[16px] text-[#030a05] font-[600] max-md:text-[16px] ">
                        {service.service}
                      </h2>
                      <p className="text-[14px] text-[#030a05] font-[500] max-md:text-[12px] ">
                        Lorem ipsum dolor sit ametni consectetur adipisicing
                        elit. Harum
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end gap-6 absolute bottom-2 right-8">
                    <Link
                      href="/catalog/expert"
                      className="text-[14px] text-[#030a05] font-bold max-md:text-[12px] hover:text-primary-green transition-all"
                    >
                      View
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-[14px] text-[#030a05] font-bold max-md:text-[12px] hover:text-primary-green transition-all"
                    >
                      Join
                    </Link>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListAllJobs;
