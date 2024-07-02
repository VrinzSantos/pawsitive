/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
interface Appointment {
  _id: string;
  userId: string;
  doctorId: string;
  doctorInfo: {
    // Define doctorInfo properties
  };
  userInfo: {
    // Define userInfo propertiesS
  };
  serviceType: string[];
  description?: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
}

interface AppointmentsResponse {
  success: boolean;
  message?: string;
  data?: Appointment[];
  error?: string;
}

export const useFetchAppointments = () => {
  return useQuery<Appointment[], string>("appointments", async () => {
    const response = await axios.get<AppointmentsResponse>(
      "http://localhost:5000/api/appointment/appointments"
    );
    if (response.data.success) {
      return response.data.data || [];
    } else {
      throw new Error(response.data.error || "Error fetching appointments");
    }
  });
};

export const useFetchFullyBookedDates = () => {
  const [fullyBookedDates, setFullyBookedDates] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFullyBookedDates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointment/fully-booked-appointments"
        );
        setFullyBookedDates(response.data.fullyBookedDates);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFullyBookedDates();

    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return { fullyBookedDates, loading, error };
};
