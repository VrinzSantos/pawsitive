/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

export const useFetchDailySales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserFeedback = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/generate/daily-sales"
        );
        const sortedData = response.data.data.sort((a: any, b: any) => {
          return dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
        });
        setData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFeedback();
  }, []);

  return { data };
};
