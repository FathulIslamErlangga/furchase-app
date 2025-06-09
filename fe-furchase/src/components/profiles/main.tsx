"use client";
import React from "react";
import Bio from "./Bio";
import { useProfileComponent } from "@/hooks/hookComponents/profiles/profileCom.hooks";
import MenuProfile from "./MenuProfile";
import ChangePassword from "./ChangePassword";
import ListAddresses from "./ListAddresses";
import AddingAddress from "./AddingAddress";
import { UseAddressComponent } from "@/hooks/hookComponents/addresses/AddressCom.hooks";
import UpdatingAddress from "./UpdatingAddress";
import DetailAddress from "./DetailAddress";

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

  const {
    isToastAddress,
    initialValuesAddress,
    status: statusAddress,
    message: messageAddress,
    addresses,
    initialValuesUpdate,
    isDelete,
    isSelect,
    getDataById,
    setDelete,
    setSelect,
    handleDefaultAddress,
    handleDeleteAddress,
    handleCreateAddress,
    setGetDataById,
    handleUpdateAddress,
  } = UseAddressComponent({ setMenu, isMenu });

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
        {isMenu === "address" && (
          <ListAddresses
            setMenu={setMenu}
            addresses={addresses}
            setGetDataById={setGetDataById}
            message={message}
            status={status}
            isToast={isToast}
            isDelete={isDelete}
            setDelete={setDelete}
            isSelect={isSelect}
            setSelect={setSelect}
            handleDeleteAddress={handleDeleteAddress}
            handleDefaultAddress={handleDefaultAddress}
          />
        )}
        {isMenu === "password" && (
          <ChangePassword
            handleChangePassword={handleChangePassword}
            isToast={isToast}
            message={message}
            status={status}
            initialValues={initialValues}
          />
        )}
        {isMenu === "adding" && (
          <AddingAddress
            setMenu={setMenu}
            handleCreateAddress={handleCreateAddress}
            initialValues={initialValuesAddress}
            isToast={isToastAddress}
            message={messageAddress}
            status={statusAddress}
          />
        )}
        {isMenu === "updating" && (
          <UpdatingAddress
            setMenu={setMenu}
            isToast={isToastAddress}
            message={messageAddress}
            status={statusAddress}
            handleUpdateAddress={handleUpdateAddress}
            initialValuesUpdate={initialValuesUpdate}
          />
        )}
        {isMenu === "view" && (
          <DetailAddress setMenu={setMenu} address={getDataById} />
        )}
      </div>
    </section>
  );
};

export default Profiles;
