import api from "@/utils/api/axios";
import { DataAddress, DataResponse } from "@/utils/interfaces/customInterface";

export const CreateData = async (data: DataAddress, slug: string) => {
  try {
    const response = await api.post<DataResponse>(`/address/v1/${slug}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getData = async (slug: string) => {
  try {
    const response = await api.get<DataResponse>(`/address/v2/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateData = async (
  data: DataAddress,
  id: string,
  slug: string
) => {
  try {
    const response = await api.patch<DataResponse>(
      `/address/v3/${slug}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const selectData = async (id: string, slug: string) => {
  try {
    const response = await api.patch<DataResponse>(`/address/v4/${slug}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteData = async (id: string, slug: string) => {
  try {
    const response = await api.delete<DataResponse>(
      `/address/v5/${slug}/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
