"use client";
import {
  CreateData,
  deleteData,
  getData,
  selectData,
  updateData,
} from "@/services/addresses.services";
import { addressProps } from "@/utils/interfaces/contextInterface";
import { DataAddress, DataResponse } from "@/utils/interfaces/customInterface";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const addressHooks = (): addressProps => {
  const [addresses, setAddresses] = useState<DataResponse>();
  const [message, setMessage] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const { slug } = useParams();
  const clearAddressMessage = () => {
    setMessage(undefined);
    setStatus(undefined);
  };

  useEffect(() => {
    if (slug) {
      getDataAddress(slug as string);
    }
  }, [slug]);

  const CreateAddress = async (data: DataAddress, slug: string) => {
    try {
      const response = await CreateData(data, slug);
      setAddresses(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };

  const getDataAddress = async (slug: string) => {
    try {
      const response = await getData(slug);
      setAddresses(response);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };

  const updateAddress = async (data: DataAddress, id: string, slug: string) => {
    try {
      const response = await updateData(data, slug, id);
      setAddresses(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };

  const selectAddress = async (id: string, slug: string) => {
    try {
      const response = await selectData(slug, id);
      setAddresses(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };
  const deleteAddress = async (id: string, slug: string) => {
    try {
      const response = await deleteData(slug, id);
      setAddresses(response);
      setMessage(response.message);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setStatus(error.response.data.status);
        setMessage(error.response.data.message);
      }
    }
  };
  return {
    addresses,
    message,
    status,
    CreateAddress,
    getDataAddress,
    clearAddressMessage,
    updateAddress,
    deleteAddress,
    selectAddress,
  };
};
