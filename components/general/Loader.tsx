import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="rounded-full border-4 border-[#1494d3] border-t-[#1f2937] w-12 h-12 animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
