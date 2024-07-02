import axios from "axios";
import { useQuery } from "react-query";
interface ClientRecord {
  fullName: string;
  address: string;
  contact: string;
  nameOfPet: string;
  species: string;
  petsBreed: string;
  petsSex: string;
  petsBirthdate: Date;
  petsHistory?: string[];
  historyDate?: Date[];
  petsMedication?: string[];
  medicationDate?: Date[];
  nextVisit?: Date;
}

const fetchClientData = async () => {
  const response = await axios.get("http://localhost:5000/api/client");
  if (response.status === 200) {
    return response.data.data;
  }
};

export const useFetchClientRecord = () => {
  return useQuery<ClientRecord[]>({
    queryKey: "clientRecord",
    queryFn: fetchClientData,
    staleTime: Infinity,
  });
};
