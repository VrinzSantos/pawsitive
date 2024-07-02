import dayjs from "dayjs";
export const formatDate = (date: Date) => {
  return dayjs(date).format("M/D/YY");
};
