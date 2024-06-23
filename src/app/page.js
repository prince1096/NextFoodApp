import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Header from "@/components/layout/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            sed obcaecati aliquid quisquam sit minus laborum voluptates
            asperiores deleniti, nobis quod, qui ipsa repudiandae nihil illum
            voluptatum exercitationem error eos.
          </p>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            sed obcaecati aliquid quisquam sit minus laborum voluptates
            asperiores deleniti, nobis quod, qui ipsa repudiandae nihil illum
            voluptatum exercitationem error eos.
          </p>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            sed obcaecati aliquid quisquam sit minus laborum voluptates.
          </p>
        </div>
      </section>

      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+46738123123"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
    </div>
  );
}
