import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import MainLayout from "@/components/MainLayout/MainLayout";
import PopularMaterials from "@/components/PopularMaterials/PopularMaterials";
import PopularProducts from "@/components/PopularProducts/PopularProducts";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection currentLink={0} />
      <PopularProducts />
      <PopularMaterials bgColor="bg-[#F7F7F7]" />
      <PopularProducts />
      <EmilistExpertSection />
    </MainLayout>
  );
}
