/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchTotalSalesToday = () => {
  const [loading, setLoading] = useState(true);
  const [salesToday, setSalesToday] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesToday = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/sales-today"
        ); // Adjust the URL based on your server route
        setSalesToday(response.data.salesToday);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesToday();
  }, []);

  return { salesToday, loading, error };
};

export const useFetchTotalUsers = () => {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesToday = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/total-users"
        ); // Adjust the URL based on your server route
        setTotalUsers(response.data.data.userCount);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesToday();
  }, []);

  return { totalUsers, loading, error };
};

export const useFetchTotalProducts = () => {
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesToday = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/total-products"
        ); // Adjust the URL based on your server route
        setTotalProducts(response.data.data.numberOfProducts);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesToday();
  }, []);

  return { totalProducts, loading, error };
};

export const useFetchTotalAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesToday = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/total-appointments"
        ); // Adjust the URL based on your server route
        setTotalAppointments(response.data.data.appointmentCount);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesToday();
  }, []);

  return { totalAppointments, loading, error };
};

export const useFetchWeeklySalesTotal = () => {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataResponse, setDataResponse] = useState<any>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesToday = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/weekly-sales"
        ); // Adjust the URL based on your server route
        setDataResponse(response.data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesToday();
  }, []);

  return { dataResponse, loading, error };
};

export const useFetchBestSellingItem = (value: string) => {
  const convertValue = parseInt(value);

  const [loading, setLoading] = useState(true);
  const [bestSellingProducts, setDataResponse] = useState<any>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesToday = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/dashboard/best-selling?value=${convertValue}`
        );
        setDataResponse(response.data.bestSellingProducts);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesToday();
  }, [convertValue]); // Make sure to include convertValue in the dependency array

  return { bestSellingProducts, loading, error };
};

export const useFetchLowSellingProducts = (value: string) => {
  const convertValue = parseInt(value);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lowSellingProducts, setDataResponse] = useState<any>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesToday = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/dashboard/low-selling?value=${convertValue}`
        ); // Adjust the URL based on your server route
        setDataResponse(response.data.lowSellingProducts);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesToday();
  }, [convertValue]);

  return { lowSellingProducts, loading, error };
};

interface ProductDistribution {
  name: string;
  value: number;
  color: string;
}

export const useFetchProductDistribution = () => {
  const [loading, setLoading] = useState(true);
  const [productDistribution, setDataResponse] = useState<
    ProductDistribution[] | undefined
  >();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDistribution = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/product-distribution"
        );
        // const modifiedData = response.data.categoryDistribution.map((item) => ({
        //   name: item._id,
        //   value: item.count,
        //   color: getRandomColor(),
        // }));
        setDataResponse(response.data.categoryDistribution);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDistribution();
  }, []);

  return { productDistribution, loading, error };
};

interface MonthlySalesData {
  monthYear: string;
  totalAmount: number;
}

interface MonthlySalesResponse {
  success: boolean;
  monthlySalesData: MonthlySalesData[];
}

interface MonthlySalesHook {
  monthlySalesData: MonthlySalesData[] | undefined;
  loading: boolean;
  error: string | null;
}

export const useFetchMonthlySales = () => {
  const [monthlySalesData, setMonthlySalesData] = useState<
    MonthlySalesData[] | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const response = await axios.get<MonthlySalesResponse>(
          "http://localhost:5000/api/dashboard/monthly-sales"
        );
        setMonthlySalesData(response.data.monthlySalesData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySales();

    // Cleanup function to cancel the fetch if the component unmounts
    return () => {
      // Implement any cleanup logic here if needed
    };
  }, []);

  return { monthlySalesData, loading, error } as MonthlySalesHook;
};

export const useFetchUserFeedback = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserFeedback = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/feedbacks/feedback-rating"
        );
        setData(response.data.categoryAverageRatings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFeedback();
  }, []);

  return { data };
};

export const useFetchFeedbackData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedbacks");
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFeedback();
  }, []);

  return { data };
};

export const useFetchMonthlyBestProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthlyBestProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/monthly-best-products"
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonthlyBestProducts();
  }, []);

  return { data };
};

export const useFetchMonthlyLowProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMonthlyBestProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/monthly-low-selling-products"
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonthlyBestProducts();
  }, []);

  return { data };
};

export const useFetchMonthlyAverage = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const fetchMonthlyAverage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/monthly-average-sales"
        );
        setData(response.data.data.totalSales);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonthlyAverage();
  }, []);

  return { data };
};

export const useFetchClientLocations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchClientLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/clients-by-location"
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientLocations();
  }, []);

  return { data };
};

export const useFetchPetBreeds = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPetBreeds = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/pets-breed-count"
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPetBreeds();
  }, []);

  return { data };
};
