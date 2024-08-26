import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import MainLayout from "@/components/MainLayout/MainLayout";
import PopulaeMaterials from "@/components/PopularMaterials/PopularMaterials";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection currentLink={0} />
      <PopulaeMaterials />
      <EmilistExpertSection />
    </MainLayout>
  );
}
