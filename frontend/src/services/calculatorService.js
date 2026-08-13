import api from "./api";

export const calculateCapacity = async (data) => {
  const response = await api.post("/calculations/calculate", data);

  return response.data;
};


export const getCapacity = () => {
  try{
      const response = api.get("/calculations/:id");
  }catch (error) {
    console.error('Hubo un error al obtener la información:', error);
  }
  return response.data;
};