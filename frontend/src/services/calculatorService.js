import api from "./api";

export const calculateCapacity = async (data) => {
  const response = await api.post("/calculations/calculate", data);

  return response.data;
};


export const getCalculation = async (id) => {
  const response = await api.get(`/calculations/${id}`);
  return response.data;
};

export const registerLead = async (email, calculationId) => {
  const response = await api.post("/leads/register", {
    email,
    calculation_id: calculationId,
  });

  return response.data;
};

export const downloadCalculationPdf = async (id) => {
  const response = await api.get(`/calculations/${id}/pdf`, {
    responseType: "blob",
  });

  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = `physaflow-calculation-${id.slice(0, 8)}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
