import api from "./api";

export const calculateCapacity = async (data) => {
  const response = await api.post("/calculations/calculate", data);

  return response.data;
};