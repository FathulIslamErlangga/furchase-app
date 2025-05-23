import { Pattaya } from "next/font/google";
import React from "react";

type Props = {};
const pattaya = Pattaya({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pattaya",
});
const Logo = (props: Props) => {
  return (
    <div className={`${pattaya.variable} logo py-20`}>
      <h1>FUNA</h1>
    </div>
  );
};

export default Logo;
