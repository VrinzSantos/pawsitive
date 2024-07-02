import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestOrderFunctionAPI = async (requestBody: any) => {
  console.log("🚀 ~ requestOrderFunctionAPI ~ requestBody:", requestBody);
  const response = await axios.post(
    "http://localhost:5000/api/inventory/create-order",
    requestBody
  );
  console.log("🚀 ~ requestOrderFunctionAPI ~ response:", response.data);
  return response.data;
};
