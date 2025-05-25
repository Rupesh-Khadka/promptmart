import React, { FC } from "react";
import Heading from "../../components/general/Heading";
import { getAllShops } from "../../action";
import AllShops from "../../components/general/AllShops";

const Shop = async () => {
  const shopsData = await getAllShops();

  return (
    <div>
      <Heading
        title="Becodemy - Admin"
        description="Becodemy is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="2xl:w-[84%] w-[80%]">
        <AllShops shopsData={shopsData} />
      </div>
    </div>
  );
};

export default Shop;
