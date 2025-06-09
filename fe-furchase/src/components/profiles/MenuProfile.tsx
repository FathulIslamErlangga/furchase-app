import React from "react";

type Props = {
  setMenu: React.Dispatch<
    React.SetStateAction<
      "bio" | "address" | "password" | "adding" | "updating" | "view"
    >
  >;
  isMenu: "bio" | "address" | "password" | "adding" | "updating" | "view";
};

const MenuProfile = (props: Props) => {
  return (
    <div className="flex-1/4  pl-20">
      <ul className="rounded-md p-5 bg-base-200 w-56  mx-auto">
        <li
          className={`${
            props.isMenu === "bio"
              ? "border-2  border-oranges-primary bg-oranges-primary rounded-md mt-5 text-lg font-semibold "
              : "border-2 border-transparent hover:border-oranges-primary hover:bg-oranges-primary hover:rounded-md mt-5 text-lg font-semibold transition-all duration-300 ease-in-out cursor-pointer"
          }`}
        >
          <button
            className="p-1 cursor-pointer"
            type="button"
            onClick={() => props.setMenu("bio")}
          >
            Bio Data
          </button>
        </li>
        <li
          className={`${
            props.isMenu === "address" ||
            props.isMenu === "adding" ||
            props.isMenu === "updating" ||
            props.isMenu === "view"
              ? "border-2  border-oranges-primary bg-oranges-primary rounded-md mt-5 text-lg font-semibold "
              : "border-2 border-transparent hover:border-oranges-primary hover:bg-oranges-primary hover:rounded-md mt-5 text-lg font-semibold transition-all duration-300 ease-in-out cursor-pointer"
          }`}
        >
          <button
            className="p-1 cursor-pointer"
            type="button"
            onClick={() => props.setMenu("address")}
          >
            Your address
          </button>
        </li>
        <li
          className={`${
            props.isMenu === "password"
              ? "border-2  border-oranges-primary bg-oranges-primary rounded-md mt-5 text-lg font-semibold "
              : "border-2 border-transparent hover:border-oranges-primary hover:bg-oranges-primary hover:rounded-md mt-5 text-lg font-semibold transition-all duration-300 ease-in-out cursor-pointer"
          }`}
        >
          <button
            className="p-1 cursor-pointer"
            type="button"
            onClick={() => props.setMenu("password")}
          >
            Change password
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuProfile;
