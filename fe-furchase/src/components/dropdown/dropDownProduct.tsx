"use client";
import React, { useState } from "react";
import SubFuniture from "./sub/SubFuniture";
import Link from "next/link";

const DropDownProduct = () => {
  const [menuProduct, setMenuProduct] = useState(false);

  const handleMouseLeave = () => setMenuProduct(false);

  return (
    <div className="absolute bg-white shadow-xl hidden group-hover:block rounded-md">
      <ul className="px-5  py-4 ">
        <li className="pt-2 hover:bg-oranges-primary rounded-md p-1">
          <Link href="#">New products</Link>
        </li>
        <li className="pt-2 hover:bg-oranges-primary rounded-md p-1">
          <Link href="#">Best sellers</Link>
        </li>
        <li className="pt-2 group/furniture  hover:bg-oranges-primary rounded-md p-1">
          <button
            className=" cursor-pointer"
            onClick={() => setMenuProduct(true)}
          >
            Funiture
          </button>
          {menuProduct && <SubFuniture mouseLeave={handleMouseLeave} />}
        </li>
        <li className="pt-2 hover:bg-oranges-primary rounded-md p-1 cursor-pointer">
          Lighting & Electronics
        </li>
      </ul>
    </div>
  );
};

export default DropDownProduct;
