"use client";
import React from "react";
import Bio from "./Bio";
import { useProfileComponent } from "@/hooks/hookComponents/profiles/profileCom.hooks";
import MenuProfile from "./MenuProfile";
import ChangePassword from "./ChangePassword";

type Props = {};

const Profiles = (props: Props) => {
  const {
    auth,
    mouseLeave,
    open,
    mouseIn,
    handleCoverFile,
    handleButtonUpdate,
    handleChangeValue,
    handleImageChange,
    handleUpdate,
    update,
    formData,
    coverFileRef,
    isToast,
    message,
    status,
    isMenu,
    setMenu,
    handleChangePassword,
    initialValues,
  } = useProfileComponent();

  const AddressComponent = () => <div>Daftar alamat kamu di sini</div>;
  return (
    <section className="flex py-20  relative">
      <MenuProfile setMenu={setMenu} isMenu={isMenu} />
      <div className="flex-3/4 ">
        {isMenu === "bio" && (
          <Bio
            auth={auth}
            coverFileRef={coverFileRef}
            formData={formData}
            handleButtonUpdate={handleButtonUpdate}
            handleChangeValue={handleChangeValue}
            handleCoverFile={handleCoverFile}
            handleImageChange={handleImageChange}
            handleUpdate={handleUpdate}
            isToast={isToast}
            message={message}
            mouseIn={mouseIn}
            mouseLeave={mouseLeave}
            open={open}
            status={status}
            update={update}
          />
        )}
        {isMenu === "address" && <AddressComponent />}
        {isMenu === "password" && (
          <ChangePassword
            handleChangePassword={handleChangePassword}
            isToast={isToast}
            message={message}
            status={status}
            initialValues={initialValues}
          />
        )}
      </div>
    </section>
  );
};

export default Profiles;
