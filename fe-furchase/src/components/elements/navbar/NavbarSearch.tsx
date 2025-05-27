import Image from "next/image";
import React from "react";

type Props = {};

const NavbarSearch = (props: Props) => {
  return (
    <div className="flex  justify-items-center">
      <form action="" className="flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Search Your Product"
          className="focus:outline-none border-b-[3px] text-lg border-oranges-primary "
        />
        <label>
          <Image
            src="/assets/images/glass.png"
            className="p-2 w-full h-full m-2 bg-oranges-primary rounded-full"
            alt="Glass"
            width={20}
            height={20}
          />
        </label>
      </form>
    </div>
  );
};

export default NavbarSearch;
