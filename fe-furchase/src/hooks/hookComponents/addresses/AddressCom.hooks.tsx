import { useGlobal } from "@/components/contexts/GlobalContexts";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  DataAddress,
  DataAddressWithId,
} from "@/utils/interfaces/customInterface";
import { getCookie } from "cookies-next";

type Props = {
  setMenu: React.Dispatch<
    React.SetStateAction<
      "bio" | "address" | "password" | "adding" | "updating" | "view"
    >
  >;
  isMenu: "bio" | "address" | "password" | "adding" | "updating" | "view";
};
export const UseAddressComponent = ({ setMenu, isMenu }: Props) => {
  const { address, auth } = useGlobal();
  const {
    CreateAddress,
    getDataAddress,
    clearAddressMessage,
    updateAddress,
    selectAddress,
    deleteAddress,
    message,
    status,
    addresses,
  } = address;

  const [getDataById, setGetDataById] = useState<DataAddressWithId>();
  const [isToastAddress, setToast] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isSelect, setSelect] = useState(false);
  const [initialValuesUpdate, setInitialValuesUpdate] = useState<DataAddress>({
    address: "",
    city: "",
    province: "",
    postalCode: 0,
    label: "",
  });
  const { slug } = useParams();
  const token = getCookie("jwt");
  const selectedAddress = addresses?.data?.profiles?.addresses.find(
    (addr) => addr.id === getDataById?.id
  );
  const initialValuesAddress: DataAddress = {
    address: "",
    city: "",
    province: "",
    postalCode: 0,
    label: "",
  };

  useEffect(() => {
    if (getDataById) {
      setInitialValuesUpdate({
        address: getDataById?.address ?? "",
        city: getDataById?.city ?? "",
        province: getDataById?.province ?? "",
        postalCode: getDataById?.postalCode ?? 0,
        label: getDataById?.label ?? "",
      });
    }
  }, [getDataById]);

  useEffect(() => {
    if (message) {
      setToast(true);
      const timeOut = setTimeout(() => {
        setToast(false);
        clearAddressMessage();
        setMenu("address");
        setDelete(false);
      }, 3000);

      return () => clearTimeout(timeOut);
    }
  }, [message]);

  const handleCreateAddress = async (data: DataAddress) => {
    try {
      await CreateAddress(data, slug as string);

      await getDataAddress(slug as string);
      if (token) {
        await auth.getUsers(token as string);
      }
    } catch (error) {
      console.log("add address:", error);
    }
  };

  const handleUpdateAddress = async (data: DataAddress) => {
    try {
      if (selectedAddress && selectedAddress.id) {
        await updateAddress(data, slug as string, selectedAddress.id);
        await getDataAddress(slug as string);
        if (token) {
          await auth.getUsers(token as string);
        }
      }
    } catch (error) {
      console.log("update address:", error);
    }
  };

  const handleDeleteAddress = async () => {
    try {
      if (selectedAddress && selectedAddress.id) {
        await deleteAddress(slug as string, selectedAddress.id);
        await getDataAddress(slug as string);
        if (token) {
          await auth.getUsers(token as string);
        }
      }
    } catch (error) {
      console.log("delete address error:", error);
    }
  };
  const handleDefaultAddress = async (addressId: string) => {
    try {
      await selectAddress(slug as string, addressId);
      await getDataAddress(slug as string);
      setSelect(false);
      if (token) {
        await auth.getUsers(token as string);
      }
    } catch (error) {
      console.log("delete address error:", error);
    }
  };

  return {
    isToastAddress,
    initialValuesAddress,
    status,
    message,
    addresses,
    isDelete,
    isSelect,
    getDataById,
    initialValuesUpdate,
    handleCreateAddress,
    setGetDataById,
    handleUpdateAddress,
    setDelete,
    setSelect,
    handleDefaultAddress,
    handleDeleteAddress,
  };
};
