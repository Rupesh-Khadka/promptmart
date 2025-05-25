import { stripePaymentIntegration } from "@/app/action";
import { requireUser } from "@/app/utils/requireUser";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import { PromptDetails } from "@/components/general/prompt/PromptDetail";
import { ShopBanner } from "@/components/general/shop/ShopBAnner";
import { Divider } from "@heroui/react";

export default async function PromptIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireUser();

  return (
    <div>
      <div className="shop-banner">
        <Header
          user={session}
          activeItem={0}
          isSellerExist={session.shop ? true : false}
        />
        <ShopBanner title="Animal Prompt" />
      </div>

      <div className="w-[95%] md:w-[80%] xl:w-[85%] 2xl:w-[80%] m-auto">
        <PromptDetails id={id} />
        <Divider className="bg-[#ffffff14] mt-5" />
        <Footer />
      </div>
    </div>
  );
}
