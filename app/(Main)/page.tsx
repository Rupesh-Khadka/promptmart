import About from "@/components/general/About";

import Footer from "@/components/general/Footer";
import Future from "@/components/general/Future";
import Header from "@/components/general/Header";
import Hero from "@/components/general/Hero";
import Partner from "@/components/general/Partner";

import SellerBanner from "@/components/general/SellerBanner";
import { Divider } from "@heroui/react";
import Image from "next/image";
import { auth } from "../utils/auth";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { getPrompt, getTopSellers } from "../action";
import LatestPrompt from "@/components/general/prompt/LatestPrompt";
import { lazy, Suspense } from "react";
import SellerCardLoader from "@/components/loaders/SellerCardLoader";

const BestSellers = lazy(() => import("@/components/general/BestSellers"));

export default async function Home() {
  const session = await auth();

  if (session?.user?.role?.toUpperCase() === "ADMIN") {
    redirect("/admin");
  }

  let isSeller = false;

  if (session?.user?.id) {
    const isSellerExist = await prisma.shop.findUnique({
      where: {
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    isSeller = isSellerExist ? true : false;
  }

  const promptData = await getPrompt();
  const sellerData = await getTopSellers();

  return (
    <div className="overflow-hidden">
      <div className=" ">
        <Header user={session?.user} activeItem={0} isSellerExist={isSeller} />
        <Hero />
      </div>

      <Image
        src={"https://pixner.net/aikeu/assets/images/footer/shape-two.png"}
        width={120}
        height={120}
        alt="Star"
        className="absolute right-[0px] "
      />  

      <br />

      <div className="w-[95%] md:w-[90%] xl:w-[80%] 2xl:w-[75%] m-auto">
        <About />
        <div>
          <LatestPrompt initialPrompts={promptData} />
          <br />
          {sellerData.map((seller:any) => (
            <Suspense fallback={<SellerCardLoader />} key={seller.id}>
              <BestSellers sellers={seller} />
            </Suspense>
          ))}
          <Future />
          <Partner />
          <SellerBanner />
          <br />
          <br />
          <Divider className="bg-[#ffffff23]" />
          <Footer />
        </div>
      </div>
    </div>
  );
}