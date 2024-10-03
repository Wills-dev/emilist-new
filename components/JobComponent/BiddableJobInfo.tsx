"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { useSaveJob } from "@/hooks/useSaveJob";
import { useUnsaveJob } from "@/hooks/useUnSaveJob";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useAcceptQuote } from "@/hooks/useAcceptQuote";
import { useRequestQuote } from "@/hooks/useRequestQuote";
import { useDeleteApplicant } from "@/hooks/useDeleteApplicant";
import { useGetUserSavedJobs } from "@/hooks/useGetUserSavedJobs";
import { useGetBiddableJobInfo } from "@/hooks/useGetBiddableJobInfo";
import { useWithdawApplication } from "@/hooks/useWithdawApplication";
import { useApplyForBiddableJob } from "@/hooks/useApplyForBiddableJob";
import { Capitalize, formatCreatedAt, numberWithCommas } from "@/helpers";
import { useAcceptBiddableApplicant } from "@/hooks/useAcceptBiddableApplicant";

import AddQoute from "./AddQoute";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import PromoteModal from "../modals/PromoteModal";

interface BiddableJobInfoProps {
  jobId: string;
}

const BiddableJobInfo = ({ jobId }: BiddableJobInfoProps) => {
  const { currentUser } = useContext(AuthContext);

  const [openChat, setOpenChat] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openActionDropdown, setOpenActionDropdown] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);

  const { handleSaveJob, rerender } = useSaveJob();
  const { handleUnsaveJob, unsaveRerenderr } = useUnsaveJob();
  const { handleDeleteJob, isDeleteLoading } = useDeleteJob();
  const { loading, getJobInfo, jobInfo } = useGetBiddableJobInfo();
  const { requestQuote, requestLoading, rerenderr } = useRequestQuote();
  const { removeApplicant, loadingRemove, removeRerender } =
    useDeleteApplicant();
  const { acceptQuote, loadingAcceptQuote, acceptQuoteRerender } =
    useAcceptQuote();
  const { saveLoading, allUserSavedJobs, getAllUserSavedJobs } =
    useGetUserSavedJobs();
  const { acceptBiddableApplicant, loadingAccept, acceptRerender } =
    useAcceptBiddableApplicant();
  const {
    rerenderWithdraw,
    isWithdrawLoading,
    handleWithdrawApplicationFofJob,
  } = useWithdawApplication();
  const {
    applyForBiddableJob,
    bidLoading,
    setAmount,
    amount,
    milestoneAmounts,
    milestonePercentage,
    inputCount,
    setInputCount,
    handleMilestonePercentageChange,
    handleCancelBidModal,
    openBidModal,
    setOpenBidModal,
    applyRerender,
    handleBlur,
  } = useApplyForBiddableJob();

  const showQuoteComponent = jobInfo?.applicants?.some((applicant: any) => {
    if (
      applicant.applicantId === currentUser.unique_id &&
      applicant.isRequestQuote &&
      !applicant?.Quote?.amount
    ) {
      return true;
    } else return false;
  });

  const isApplied = () =>
    jobInfo?.applicants?.some(
      (userApplied: any) => userApplied?.applicantId === currentUser?.unique_id
    );

  const onCancelPromoModal = () => {
    setIsPromoModalOpen(false);
  };

  const handleOpen = () => {
    setOpenChat((prev) => !prev);
  };

  useEffect(() => {
    getJobInfo(jobId);
    getAllUserSavedJobs();
  }, [
    jobId,
    currentUser,
    rerenderr,
    rerender,
    unsaveRerenderr,
    applyRerender,
    acceptRerender,
    rerenderWithdraw,
    removeRerender,
    acceptQuoteRerender,
  ]);

  const isSaved = () =>
    allUserSavedJobs?.some((savedJob: any) => savedJob.id === jobId);

  return (
    <section className="py-28 padding-x bg-[#F0FDF5] min-h-screen">
      <LoadingOverlay loading={requestLoading} />
      <LoadingOverlay loading={loadingAccept} />
      <LoadingOverlay loading={isWithdrawLoading} />
      <LoadingOverlay loading={isDeleteLoading} />
      <LoadingOverlay loading={loadingRemove} />
      <LoadingOverlay loading={loadingAcceptQuote} />

      {loading || saveLoading ? (
        <div className="flex w-full min-h-[70vh] item-center justify-center text-green-500 mt-6">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          {openChat && (
            <div className="absolute w-full h-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)]"></div>
          )}
          <div className="grid grid-cols-12 py-10 gap-6">
            <AddQoute
              showQuoteComponent={showQuoteComponent}
              jobInfo={jobInfo}
              getJobInfo={getJobInfo}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10  max-h-fit">
              <div className="w-full border-b-[1px] border-[#B8B9B8] px-10 max-sm:px-5">
                <div className="flex items-center justify-between">
                  <h5 className="text-[#000000] text-[30px] leading-[36px] font-[600] max-sm:text-[20px] pb-3">
                    {jobInfo?.jobTitle && Capitalize(jobInfo.jobTitle)}
                  </h5>
                  {jobInfo?.jobStatus === "pending" ||
                  jobInfo?.jobStatus === "amended" ? (
                    <>
                      {currentUser.unique_id ===
                        jobInfo?.userDetails?.userId && (
                        <div className="block relative">
                          <Image
                            src="/assets/icons/menudot.svg"
                            alt="menu"
                            width={30}
                            height={30}
                            className="object-contain w-[30px] h-[30px] max-sm:w-[18px] max-sm:h-[18px] max-sm:hidden cursor-pointer"
                            onClick={() =>
                              setOpenActionDropdown((prev) => !prev)
                            }
                          />
                          {/* the action dropdown */}

                          {openActionDropdown && (
                            <div className="absolute shadow-md rounded-[10px] bg-white flex flex-col gap-3 px-6 max-sm:px-3 py-6 items-start right-0 text-[#282828] text-[16px] max-sm:text-[13px] ">
                              <Link
                                href={`/dashboard/job/edit/biddable/${jobId}`}
                                className=" whitespace-nowrap hover:text-primary-green transition-all w-full"
                              >
                                Edit
                              </Link>

                              <button
                                className=" whitespace-nowrap hover:text-primary-green transition-all w-full"
                                onClick={() => handleDeleteJob(jobId)}
                              >
                                Remove from the board
                              </button>
                              <button
                                className=" text-left whitespace-nowrap  hover:text-primary-green transition-all w-full"
                                onClick={() => handleDeleteJob(jobId)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                          {/* end of action dropdown */}
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
                {currentUser?.unique_id === jobInfo?.userDetails?.userId && (
                  <div className="flex items-center gap-3">
                    <button
                      className="text-primary-green text-[16px] leading-[24px] font-[500] max-sm:text-[14px] py-2  underline"
                      onClick={() => setIsPromoModalOpen(true)}
                    >
                      Promote
                    </button>
                    <Link
                      href="/dashboard/report/insights"
                      className="text-primary-green text-[16px] leading-[24px] font-[500] max-sm:text-[14px] py-2  underline"
                    >
                      Insight
                    </Link>
                    <PromoteModal
                      isOpen={isPromoModalOpen}
                      onCancel={onCancelPromoModal}
                    />
                  </div>
                )}
              </div>
              <div className="w-full border-b-[1px] border-[#B8B9B8] px-10 max-sm:px-5 py-6 flex flex-col gap-3">
                <h5 className="text-primary-green text-[20px] leading-[28px] font-[500] max-sm:text-[16px]">
                  {jobInfo?.category && Capitalize(jobInfo.category)}
                </h5>
                <div className="flex max-lg:flex-col items-center justify-between flex-wrap gap-5">
                  <div className="flex items-center  gap-10  max-sm:gap-5 max-lg:w-full">
                    <p className="text-[#5E625F] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                      Posted{" "}
                      {jobInfo?.date ? formatCreatedAt(jobInfo.date) : "2 days"}
                    </p>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/assets/icons/location.svg"
                        alt="menu"
                        width={20}
                        height={20}
                        className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                      />
                      <p className="text-[#1A201B] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                        {jobInfo?.location && Capitalize(jobInfo?.location)}
                      </p>
                    </div>
                    <p className="text-[#030A05] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                      <span className="text-[#1A201B] font-[600]">Job ID:</span>{" "}
                      {jobId && jobId}
                    </p>
                  </div>
                  {currentUser.unique_id !== jobInfo?.userDetails?.userId && (
                    <div className="flex items-center max-lg:w-full gap-2">
                      {jobInfo?.jobStatus === "pending" ||
                      jobInfo?.jobStatus === "amended" ? (
                        <>
                          {isApplied() ? (
                            <button
                              className="bg-[#FF5D7A] px-[20px] py-[12px] text-[#FCFEFD] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center  max-sm:py-[8px] max-sm:text-[14px]"
                              onClick={() =>
                                handleWithdrawApplicationFofJob(
                                  jobId,
                                  "biddable"
                                )
                              }
                            >
                              withdraw Application
                            </button>
                          ) : (
                            <button
                              className="bg-primary-green px-[20px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center  max-sm:py-[8px] max-sm:text-[14px]"
                              onClick={() => setOpenBidModal(true)}
                            >
                              Apply
                            </button>
                          )}
                        </>
                      ) : null}

                      {isSaved() ? (
                        <button
                          className=" px-[20px] py-[12px] border-[1px] border-red-500 rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center  max-sm:py-[8px] max-sm:text-[14px] text-red-500"
                          onClick={() => handleUnsaveJob(jobId)}
                        >
                          Unsave
                        </button>
                      ) : (
                        <button
                          className=" px-[20px] py-[12px] border-[1px] border-[#030A05] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center  max-sm:py-[8px] max-sm:text-[14px]"
                          onClick={() => handleSaveJob(jobId)}
                        >
                          Save
                        </button>
                      )}
                      <button
                        className="bg-primary-green px-[20px] py-[12px] text-[#fcfefd] rounded-[10px] cursor-pointer font-bold font-exo whitespace-nowrap flex justify-center items-center  max-sm:py-[8px] max-sm:text-[14px]"
                        onClick={handleOpen}
                      >
                        <Image
                          src="/assets/icons/messages.svg"
                          alt="menu"
                          width={20}
                          height={20}
                          className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] mr-1"
                        />
                        Chats
                      </button>

                      <ApplyBiddableJobModal
                        applyForBiddableJob={applyForBiddableJob}
                        bidLoading={bidLoading}
                        setAmount={setAmount}
                        amount={amount}
                        milestoneAmounts={milestoneAmounts}
                        milestonePercentage={milestonePercentage}
                        handleMilestonePercentageChange={
                          handleMilestonePercentageChange
                        }
                        handleCancelBidModal={handleCancelBidModal}
                        openBidModal={openBidModal}
                        jobInfo={jobInfo}
                        handleBlur={handleBlur}
                        inputCount={inputCount}
                        setInputCount={setInputCount}
                      />

                      {/* chat modal */}
                      {openChat && <ChatModal handleOpen={handleOpen} />}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full border-b-[1px] border-[#B8B9B8] px-10 max-sm:px-5 py-6 ">
                <p className="text-[#303632] text-[16px] leading-[24px] font-[400] max-sm:text-[12px] max-sm:leading-[18px]">
                  {jobInfo?.description && jobInfo?.description}
                </p>
              </div>
              <div className="w-full px-10 max-sm:px-5 py-6 ">
                <div className="grid grid-cols-6 gap-10">
                  <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                    <Image
                      src="/assets/icons/layer.png"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                    />
                    <div className="flex flex-col  gap-1">
                      <h6 className="text-[#030A05] text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                        {jobInfo?.milestoneNumber && jobInfo.milestoneNumber}
                      </h6>
                      <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                        Milestone
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                    <Image
                      src="/assets/icons/clock.jpg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                    />
                    <div className="flex flex-col  gap-1">
                      <h6 className="text-[#030A05] text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                        {jobInfo?.projectDuration && jobInfo.projectDuration}
                      </h6>
                      <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                        Project duration
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                    <Image
                      src="/assets/icons/guru.png"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                    />
                    <div className="flex flex-col  gap-1">
                      <h6 className="text-[#030A05] text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                        {jobInfo?.expertLevel && jobInfo.expertLevel}
                      </h6>
                      <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                        Expert level
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                    <Image
                      src="/assets/icons/empty-wallet.jpg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                    />
                    <div className="flex flex-col gap-1">
                      <h6 className="text-[#030A05] text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                        ₦{" "}
                        {jobInfo?.bidRange &&
                          numberWithCommas(jobInfo.bidRange)}
                      </h6>
                      <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                        Bid range
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 max-sm:col-span-3 flex gap-2">
                    <Image
                      src="/assets/icons/dollar-circle.jpg"
                      alt="menu"
                      width={20}
                      height={20}
                      className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                    />
                    <div className="flex flex-col  gap-1">
                      <h6 className="text-[#030A05] text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                        ₦{" "}
                        {jobInfo?.maxPrice &&
                          numberWithCommas(jobInfo.maxPrice)}{" "}
                      </h6>
                      <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                        Maximum price
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 max-lg:hidden max-h-max flex flex-col gap-6">
              <AboutJobOwner jobInfo={jobInfo} />
              <Applicants
                jobInfo={jobInfo}
                requestQuote={requestQuote}
                acceptBiddableApplicant={acceptBiddableApplicant}
                removeApplicant={removeApplicant}
                acceptQuote={acceptQuote}
              />
            </div>
            <div className="col-span-9 max-lg:col-span-12 flelx flex-col w-full bg-white rounded-[10px] py-10 ">
              <h4 className="px-10 max-sm:px-5 mb-2 text-[#000000] text-[20px] leading-[28px] font-[600] max-sm:text-[16px]">
                Milestone
              </h4>
              {jobInfo?.milestoneDetails &&
                jobInfo.milestoneDetails.map(
                  (milestone: any, index: number) => (
                    <div
                      className=" px-10 max-sm:px-5 w-full border-t-[1px] border-[#B8B9B8] "
                      key={index}
                    >
                      <h6 className=" my-5 text-[#030A05] text-[16px] leading-[24px] font-[600] max-sm:text-[13px]">
                        Milestone {index + 1}
                      </h6>
                      <div className="flex  gap-10 max-sm:gap-5">
                        <div className=" flex gap-2">
                          <Image
                            src="/assets/icons/clock.jpg"
                            alt="menu"
                            width={20}
                            height={20}
                            className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                          />
                          <div className="flex flex-col  gap-1">
                            <h6 className="text-[#030A05] text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                              {milestone?.milestoneDuration &&
                                milestone?.milestoneDuration}
                            </h6>
                            <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                              Milestone duration
                            </p>
                          </div>
                        </div>
                        <div className=" flex gap-2">
                          <Image
                            src="/assets/icons/empty-wallet.jpg"
                            alt="menu"
                            width={20}
                            height={20}
                            className="object-contain w-[20px] h-[20px] max-sm:w-[14px] max-sm:h-[14px] "
                          />
                          <div className="flex flex-col gap-1">
                            <h6 className="text-[#030A05] text-[18px] leading-[24px] font-[600] max-sm:text-[14px]">
                              ₦
                              {milestone?.milestoneAmount &&
                                numberWithCommas(milestone?.milestoneAmount)}
                            </h6>
                            <p className="text-[#474C48] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                              Amount
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-5">
                        <h6 className=" my-5 text-[#030A05] text-[16px] leading-[24px] font-[600] max-sm:text-[13px]">
                          Milestone details
                        </h6>
                        <p className=" my-5 text-[#303632] text-[16px] leading-[24px] font-[400] max-sm:text-[12px]">
                          {milestone?.milestoneDescription &&
                            milestone?.milestoneDescription}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BiddableJobInfo;
