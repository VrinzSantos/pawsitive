import DashboardCard from "@/components/Card/DashboardCard";
import {
  useFetchTotalSalesToday,
  useFetchTotalProducts,
  useFetchTotalAppointments,
  //useFetchMonthlyAverage,
} from "@/hooks/dashboard_hooks";
import { Grid } from "@mantine/core";
import {
  IconGraph,
  IconShoppingBag,
  IconCalendarBolt,
  IconCashBanknote,
} from "@tabler/icons-react";
import { NumberFormatter } from "@mantine/core";
const UpperCards = () => {
  const { salesToday } = useFetchTotalSalesToday();
  //const { data: average } = useFetchMonthlyAverage();
  const { totalProducts } = useFetchTotalProducts();
  const { totalAppointments } = useFetchTotalAppointments();
  const data = [
    {
      title: "Sales",
      total: salesToday ,
      bgColor: "#60BD68",
      icon: <IconGraph color="white" size={30}  />,
    },
    {
      title: "Monthly Average",
      total: <NumberFormatter prefix="₱ " value={24350} thousandSeparator />,

      bgColor: "#B3C100",
      icon: <IconCashBanknote color="white" size={30} />,
    },
    {
      title: "Products",
      total: totalProducts,
      bgColor: "#004080",
      icon: <IconShoppingBag color="white" size={30} />,
    },
    {
      title: "Appointments",
      total: totalAppointments,
      bgColor: "gray",
      icon: <IconCalendarBolt color="white" size={30} />,
    },
  ];

  return (
    <>
      <Grid>
        {data.map((item, index) => (
          <Grid.Col span={3} key={index}>
            <DashboardCard
              title={item.title}
              bgColor={item.bgColor}
              total={item.total}
              icon={item.icon}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default UpperCards;
