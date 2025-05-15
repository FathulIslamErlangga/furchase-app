import React from "react";
import Link from "next/link";
import Image from "next/image";
import "@/style/navbar.css";
import { Pattaya } from "next/font/google";

const pattaya = Pattaya({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pattaya",
});
const Navbar = () => {
  return (
    <header className="header-nav ">
      <div className="navbar ">
        <div className={`${pattaya.variable} px-20`}>
          <h1 className="brand">FUNA</h1>
        </div>
        <nav className="  items-center hidden lg:flex ">
          <div className="w-full h-full relative">
            <ul className="  lg:flex lg:space-x-7 text-lg font-[450]">
              <li className=" hover:text-oranges-primary">Product</li>
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
      </div>
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
      <div className="flex justify-between px-20 space-x-8">
        <div>
          <Image
            src="/assets/images/wishlist.png"
            alt=""
            width={50}
            height={50}
          />
        </div>
        <div className="relative">
          <div className=" absolute -top-2 right-0">
            <span className="  bg-oranges-primary  rounded-full h-full w-full px-1 text-[10px] ">
              2
            </span>
          </div>
          <Image
            src="/assets/images/shopping-cart.png"
            alt=""
            width={50}
            height={50}
          />
        </div>
        <div>
          <Image
            src="/assets/images/avatar.png"
            alt=""
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="group-btn hidden">
        <div className="btn-signup ">
          <Link href="#" className="text-sm font-[400]  text-black  ">
            Register
          </Link>
        </div>
        <div className="btn-signin ">
          <Link href="#" className="text-sm font-[400]   text-black  ">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
