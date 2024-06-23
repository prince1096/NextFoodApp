import Image from "next/image";
import React from "react";
import Pizza from "@/assets/pizza.png";

const MenuItem = () => {
  return (
    <>
      <div className="bg-gray-200 rounded-lg text-center p-4 hover:bg-white transition-all shadow-2xl hover:shadow-black/25 ">
        {/* <div className="text-center"> */}
        <Image
          src={Pizza}
          alt={"sallad"}
          //   className="max-h-40 block mx-auto object-contain"
        />
        {/* </div> */}

        <h4 className="font-semibold my-2">Pepperoni Pizza</h4>
        <p className="text-gray-500 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum
          dolor sit amet, consectetur adipisicing elit
        </p>

        <button className="bg-primary text-white mt-4 px-8 py-2 rounded-full">
          Add to cart $12
        </button>
      </div>
    </>
  );
};

export default MenuItem;
