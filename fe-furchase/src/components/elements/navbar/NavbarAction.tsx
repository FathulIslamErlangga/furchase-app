import { IUsers } from "@/utils/interfaces/interface";
import Image from "next/image";
import React from "react";

type Props = {
  handleMenuProfile: () => void;
  user: IUsers | undefined;
};

const NavbarAction = (props: Props) => {
  return (
    <div className="flex justify-between px-20 space-x-8">
      {props.user && (
        <>
          <div className="pt-1">
            <Image
              src="/assets/images/wishlist.png"
              alt=""
              width={50}
              height={50}
            />
          </div>
          <div className="relative pt-1">
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
        </>
      )}

      <button
        type="submit"
        onClick={props.handleMenuProfile}
        className="cursor-pointer"
      >
        {props.user?.profiles?.images.map((image) => (
          <Image
            key={image.id}
            src={`${
              image.type === "coverProfile" && image.id.length
                ? image.url
                : "/assets/images/avatar.png"
            }`}
            className={`${image.id.length ? "rounded-full" : ""}`}
            alt=""
            width={`${image.id.length ? 70 : 50}`}
            height={`${image.id.length ? 70 : 50}`}
          />
        ))}
      </button>
    </div>
  );
};

export default NavbarAction;
