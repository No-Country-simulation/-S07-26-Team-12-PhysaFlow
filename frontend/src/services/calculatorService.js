import api from "./api";

export const calculateCapacity = async (data) => {
  const response = await api.post("/calculations", data);

  return response.data;
};