import { AddUserProps } from "@/interfaces/admin.types";
import axios from "axios";
export const addAdminUser = async (values: AddUserProps) => {
  const response = await axios.post(
    "http://localhost:5000/api/admin/createuser",
    {
      username: values.username,
      password: values.password,
    }
  );
  return response.data;
};

export const updateAdminData = async (values: AddUserProps) => {
  const response = await axios.patch(
    "http://localhost:5000/api/admin/update-admin",
    {
      _id: values._id,
      username: values.username,
      password: values.password,
    }
  );
  return response.data;
};
