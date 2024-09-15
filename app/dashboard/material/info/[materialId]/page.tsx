import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import ReviewSlider from "@/components/ReviewSlider/ReviewSlider";
import StarRating from "@/components/StarRating/StarRating";
import Image from "next/image";
import Link from "next/link";

const MaterialInfo = ({ params }: any) => {
  return (
    <main className="relative">
      <DashboardNav />
      <section className="sm:pt-28 pt-20 bg-[#F0FDF5] w-full padding-x min-h-screen pb-10">
        <div className="w-full h-ful flex gap-4 max-lg:flex-col py-10 max-sm:pt-4">
          <div className="lg:w-3/4 w-full bg-white h-full">
            <div className="flex items-start justify-between gap-6 p-6">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold  max-sm:text-xl">
                  Dangote Cement
                </h1>
                <Link
                  href={`/report/insights/2`}
                  className="max-sm:text-sm font-semibold text-primary-green"
                >
                  View Insights
                </Link>
              </div>
              <button>
                <Image
                  src="/assets/icons/Menu.svg"
                  height={20}
                  width={20}
                  alt="menu-dot"
                  className="object-contain h-8 w-6"
                />
              </button>
            </div>
            <div className="p-6 border-y-1 border-gray-300">
              <div className="flex justify-between gap-4 flex-wrap">
                <div className="flex flex-col gap-4">
                  <div className="flex-c gap-2">
                    <p className="max-sm:text-sm font-semibold text-gray-900">
                      Product ID:
                    </p>
                    <p className="max-sm:text-sm">12345</p>
                  </div>
                  <div className="flex-c gap-2">
                    <p className="max-sm:text-sm font-semibold text-gray-900">
                      Quantity:
                    </p>
                    <p className="max-sm:text-sm">12345</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex-c gap-2">
                    <p className="max-sm:text-sm font-semibold text-gray-900">
                      Brand:
                    </p>
                    <p className="max-sm:text-sm">12345</p>
                  </div>
                  <div className="flex-c gap-2">
                    <p className="max-sm:text-sm font-semibold text-gray-900">
                      Price:
                    </p>
                    <p className="max-sm:text-sm">12345</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex-c gap-2">
                    <p className="max-sm:text-sm font-semibold text-gray-900">
                      Category:
                    </p>
                    <p className="max-sm:text-sm">Construction Materials</p>
                  </div>
                  <div className="flex-c gap-2">
                    <p className="max-sm:text-sm font-semibold text-gray-900">
                      Sub-Category:
                    </p>
                    <p className="max-sm:text-sm">12345</p>
                  </div>
                </div>
              </div>
              <p className="max-sm:text-sm pt-8 pb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae voluptates eligendi est et voluptas reprehenderit
                dolores laborum quae temporibus eveniet ab unde fugiat, esse eos
                dignissimos nisi veniam sit eius cum excepturi. Perferendis
                sapiente inventore impedit magni tempore minus eos cumque, enim
                dignissimos hic culpa consequatur doloremque. Voluptates ea rem
                consequatur numquam, deserunt aliquid eum id. Ea deserunt, ab
                neque fugiat ipsa modi nihil quas facere fugit autem facilis?
                Deleniti nobis eveniet aperiam. Ea incidunt tenetur obcaecati
                libero labore distinctio velit, assumenda quibusdam molestiae
                aspernatur illo vero voluptates provident rem quam ipsam dolore
                facilis veniam a deserunt sit eveniet iste.
              </p>
            </div>
            <div className="p-6">
              <h6 className="sm:text-lg font-medium">Images</h6>
              <div className="pt-3 flex gap-4 flex-wrap">
                <Image
                  src="/assets/images/privateExpertImg.png"
                  width={200}
                  height={200}
                  alt="product-image"
                  className="w-28 h-28 rounded-lg object-cover"
                />
                <Image
                  src="/assets/images/privateExpertImg.png"
                  width={200}
                  height={200}
                  alt="product-image"
                  className="w-28 h-28 rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex-c gap-6">
                <h6 className="sm:text-lg font-medium">Rating:</h6>
                <div className="flex c gap-1">
                  <StarRating rating={4} />
                  <span className="block text-sm text-gray-400">4.0</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex-c-b gap-6">
                <h6 className="text-2xl font-semibold">Reviews</h6>
                <Link
                  href={`/dashboard/material/info/all-reviews/${2}`}
                  className="text-primary-green sm:text-sm text-xs"
                >
                  See all reviews
                </Link>
              </div>
              <div className="py-6">
                <ReviewSlider />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MaterialInfo;
