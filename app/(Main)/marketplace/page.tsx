import { getAllPrompt } from "@/app/action";
import { auth } from "@/app/utils/auth";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Marketplace from "@/components/general/Marketplace";
import { ShopBanner } from "@/components/general/shop/ShopBAnner";
import { Divider } from "@heroui/react";

type searchParams = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function MarketPlace({ searchParams }: searchParams) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const { prompts, totalPages } = await getAllPrompt(page);
  const session = await auth();

  return (
    <div>
      <div className="shop-banner">
        <Header
          user={session?.user}
          activeItem={0}
          isSellerExist={session?.user.shop ? true : false}
        />
        <ShopBanner title="Animal Prompt" />
      </div>
      <div className="w-[95%] md:w-[80%] xl:w-[85%] 2xl:w-[80%] m-auto ">
        <Marketplace
          prompts={prompts}
          totalPages={totalPages}
          currentPage={page}
        />
        <Divider className="bg-[#ffffff14] mt-5" />
        <Footer />
      </div>
    </div>
  );
}
