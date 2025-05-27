import Link from "next/link";
import React from "react";
import "@/style/dropdown.css";
import { IUsers } from "@/utils/interfaces/interface";

type Props = {
  mouseLeaveProfile: () => void;
  user: IUsers | undefined;
  handleLogout: () => void;
};

const DropDownProfile = (props: Props) => {
  return (
    <div className="profile-dropdown" onMouseLeave={props.mouseLeaveProfile}>
      <div className=" dropdown">
        <h1>
          {props.user?.profiles?.firstName} {props.user?.profiles?.lastName}
        </h1>
        <div className="line" />
        <ul className="items-dropdown">
          <li>
            <Link href="#">Profile</Link>
          </li>
          <li>
            <Link href="">Delivery</Link>
          </li>
          <li>
            <Link href="">Notification</Link>
          </li>
          <li>
            <button
              type="submit"
              className="cursor-pointer"
              onClick={props.handleLogout}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownProfile;
