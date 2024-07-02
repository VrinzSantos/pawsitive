import { DonutChart } from "@mantine/charts";
import {
  useFetchClientLocations,
  useFetchPetBreeds,
} from "@/hooks/dashboard_hooks";
import { Center, Flex, Paper, Title } from "@mantine/core";
const PetOwnerLocationChart = () => {
  const { data } = useFetchClientLocations();
  const { data: data2 } = useFetchPetBreeds();
  console.log("🚀 ~ PetOwnerLocationChart ~ data2:", data2);

  return (
    <Paper withBorder shadow="md" p={15} mt={20} radius="md">
      <Center mb={20}>
        <Title order={4}>Pet Owner Location / Pet Breed</Title>
      </Center>
      <Flex justify="center" mt={80}>
        <DonutChart
          size={205}
          strokeWidth={5}
          paddingAngle={5}
          chartLabel="Pet Owner Location"
          thickness={30}
          withLabelsLine
          withLabels
          data={data}
        />
        <DonutChart
          size={205}
          // paddingAngle={5}
          tooltipDataSource="segment"
          chartLabel="Pet Breed"
          thickness={30}
          withLabelsLine
          withLabels
          data={data2}
        />
      </Flex>
    </Paper>
  );
};

export default PetOwnerLocationChart;
