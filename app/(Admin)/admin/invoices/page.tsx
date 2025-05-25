import { getAllInvoices } from "../../action";
import AllInvoices from "../../components/general/AllInvoices";
import Heading from "../../components/general/Heading";

const Page = async () => {
  const data = await getAllInvoices();

  return (
    <div>
      <Heading
        title="Becodemy - Admin"
        description="Becodemy is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />

      <div className="2xl:w-[84%] w-[80%]">
        <AllInvoices isDashboard={false} data={data} />
      </div>
    </div>
  );
};

export default Page;
