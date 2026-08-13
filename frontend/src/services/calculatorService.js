import api from "./api";

export const calculateCapacity = async (data) => {
  const response = await api.post("/calculations/calculate", data);

  return response.data;
};


export const getCalculation = async (id) => {
  const response = await api.get(`/calculations/${id}`);
  return response.data;
};
