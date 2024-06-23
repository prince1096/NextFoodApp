import Image from "next/image";
import React from "react";

import Sallad1 from "@/assets/sallad1.png";
import Sallad2 from "@/assets/sallad2.png";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

const HomeMenu = () => {
  return (
    <div>
      <section className="">
        <div className="absolute h-full left-0 right-0 w-full justify-start">
          <div className="absolute left-0 -top-[70px] text-left -z-10">
            <Image src={Sallad1} width={109} height={189} alt={"sallad"} />
          </div>
          <div className="absolute -top-[100px] right-0 -z-10">
            <Image src={Sallad2} width={107} height={195} alt={"sallad"} />
          </div>
        </div>

        <div className="text-center mb-4">
          <SectionHeaders subHeader={"Check out"} mainHeader={"Menu"} />
        </div>

        <div className="grid grid-cols-3 gap-8">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>

        <div className="text-center mb-4">
          {/* <SectionHeaders
            subHeader={"check out"}
            mainHeader={"Our Best Sellers"}
          />  */}
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {/* {bestSellers?.length > 0 &&
            bestSellers.map((item) => <MenuItem key={item._id} {...item} />)} */}
        </div>
      </section>
    </div>
  );
};

export default HomeMenu;
