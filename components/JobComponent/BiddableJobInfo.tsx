"use client";

import { useSaveJob } from "@/hooks/useSaveJob";
import { useUnsaveJob } from "@/hooks/useUnSaveJob";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useAcceptQuote } from "@/hooks/useAcceptQuote";
import { useRequestQuote } from "@/hooks/useRequestQuote";
import { useGetUserSavedJobs } from "@/hooks/useGetUserSavedJobs";
import { useGetBiddableJobInfo } from "@/hooks/useGetBiddableJobInfo";
import { useWithdawApplication } from "@/hooks/useWithdawApplication";
import { useApplyForBiddableJob } from "@/hooks/useApplyForBiddableJob";
import { useAcceptBiddableApplicant } from "@/hooks/useAcceptBiddableApplicant";
import { useDeleteApplicant } from "@/hooks/useDeleteApplicant";

interface BiddableJobInfoProps {
  jobId: string;
}

const BiddableJobInfo = ({ jobId }: BiddableJobInfoProps) => {
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

  return <div>BiddableJobInfo</div>;
};

export default BiddableJobInfo;
