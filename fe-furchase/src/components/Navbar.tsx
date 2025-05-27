"use client";
import React, { useState } from "react";
import "@/style/navbar.css";
import DropDownProfile from "./dropdown/dropDownProfile";
import NavbarLinks from "./elements/navbar/NavbarLinks";
import NavbarSearch from "./elements/navbar/NavbarSearch";
import NavbarAction from "./elements/navbar/NavbarAction";
import NavbarAuth from "./elements/navbar/NavbarAuth";
import { useGlobal } from "./contexts/GlobalContexts";

const Navbar = () => {
  const { auth } = useGlobal();
  const user = auth.user?.data;
  const [menuProfile, setProfile] = useState(false);
  const handleMenuProfile = () => setProfile((prev) => !prev);
  const mouseLeaveProfile = () => setProfile(false);
  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.log("user logout: ", error);
    }
  };
  return (
    <header className="header-nav relative">
      <div className="navbar ">
        <div className="px-20">
          <h1 className="brand">FUNA</h1>
        </div>
        <NavbarLinks />
      </div>
      <NavbarSearch />
      <NavbarAction handleMenuProfile={handleMenuProfile} user={user} />
      <NavbarAuth user={user} />
      {menuProfile && (
        <DropDownProfile
          mouseLeaveProfile={mouseLeaveProfile}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Navbar;
