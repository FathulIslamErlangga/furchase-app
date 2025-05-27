import DropDownProduct from "@/components/dropdown/dropDownProduct";
import React from "react";

const NavbarLinks = () => {
  return (
    <nav className="  items-center hidden lg:flex ">
      <div className="w-full h-full relative">
        <ul className="  lg:flex lg:space-x-7 text-lg font-[450]">
          <li className="inline-block group">
            <span className=" group-hover:text-oranges-primary">Product</span>
            <DropDownProduct />
          </li>
          <li className=" hover:text-oranges-primary">Room</li>
          <li>
            <button className="flex items-center gap-2 text-gray-700 focus:outline-none">
              Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarLinks;
