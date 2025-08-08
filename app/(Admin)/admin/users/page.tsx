import { prisma } from "@/app/utils/db";
import AllUsers from "../../components/general/AllUsers";
import Heading from "../../components/general/Heading";
import { redirect } from "next/navigation";

const Page = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });

  if (!users) return redirect("admin/login");

  return (
    <div>
      <Heading
        title="Becodemy - Admin"
        description="Becodemy is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex min-h-screen">
        <div className="w-full">
          <AllUsers users={users} />
        </div>
      </div>
    </div>
  );
};

export default Page;
