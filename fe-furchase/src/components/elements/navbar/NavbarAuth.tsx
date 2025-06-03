import { IUsers } from "@/utils/interfaces/interface";
import Link from "next/link";
import React from "react";

type Props = {
  user: IUsers | undefined;
};

const NavbarAuth = (props: Props) => {
  return (
    <>
      {!props.user && (
        <div className="group-btn ">
          <div className="btn-signup ">
            <Link href="/register" className="text-sm font-[400]  text-black  ">
              Register
            </Link>
          </div>
          <div className="btn-signin ">
            <Link href="/login" className="text-sm font-[400]   text-black  ">
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarAuth;
