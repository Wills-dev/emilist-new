import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import ListAllJobs from "@/components/ListAllJobs/ListAllJobs";
import MainLayout from "@/components/MainLayout/MainLayout";

const FindJob = () => {
  return (
    <MainLayout>
      <HeroSection currentLink={2} />
      <ListAllJobs />
      <EmilistExpertSection />
    </MainLayout>
  );
};

export default FindJob;
