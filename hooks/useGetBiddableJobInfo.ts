import { useState } from "react";

import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetBiddableJobInfo = () => {
  const [jobInfo, setJobInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [currentMilestone, setCurrentMilestone] = useState<any>({});

  const getJobInfo = async (jobId: string) => {
    try {
      const data = await axiosInstance.get(`/get_biddable_job_info/${jobId}`);
      setJobInfo(data?.data);
      setCurrentMilestone(data?.data?.milestoneDetails[0]);
    } catch (error: any) {
      console.log("error getting biddable jobs", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    getJobInfo,
    jobInfo,
    currentMilestone,
    setCurrentMilestone,
  };
};
