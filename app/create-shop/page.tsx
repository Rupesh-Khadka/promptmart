import CreateShopForm from "@/components/forms/CreateShopForm";
import { requireUser } from "../utils/requireUser";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";

const CreateShop = async () => {
  const session = await requireUser();

  const shop = await prisma.shop.findUnique({
    where: {
      userId: session.id,
    },
    select: {
      id: true,
    },
  });

  if (shop) {
    redirect("/my-shop");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <h1 className="text-4xl font-[700] font-Inter text-white text-center font-Monserrat">
        Start to selling with us
      </h1>
      <div className="2xl:w-[40%] xl:w-[50%] md:w-[70%] w-[90%] mx-auto">
        <CreateShopForm />
      </div>
    </div>
  );
};

export default CreateShop;
