import React from "react";
import Image from "next/image";

type Props = {};

const Bio = (props: Props) => {
  return (
    <section className="py-20">
      <div className="container mx-auto pt-10">
        <div className=" py-15 bg-gray-100 rounded-lg mx-auto flex w-[50%] justify-center relative ">
          <div className="flex justify-center  items-center rounded-full  absolute -top-20 ">
            <Image
              src="/assets/images/avatar.jpeg"
              alt=""
              width={120}
              height={120}
              className="rounded-full mx-auto bg-white p-2"
            />
          </div>
          <div className="pt-5 ">
            <form action="">
              <div className="flex flex-1/2 space-x-32 space-y-10">
                <div className="pt-4 ">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Winx"
                    className="focus:outline-none border-b-3 border-gray-100 pt-5 block"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Star"
                    className="focus:outline-none border-b-3 border-gray-100 pt-5 block"
                  />
                </div>
              </div>
              <div className=" flex flex-1/2 space-x-32 space-y-10">
                <div className="pt-4 ">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="example@gml.com"
                    className="focus:outline-none border-b-3 border-gray-100 pt-5 block"
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="02222222"
                    className="focus:outline-none border-b-3 border-gray-100 pt-5 block"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
