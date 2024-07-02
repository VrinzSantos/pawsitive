import ViewFeedbackmodal from "@/components/Modal/Feebacks/ViewFeedback.modal";
import { useFetchUserFeedback } from "@/hooks/dashboard_hooks";

import { BarChart } from "@mantine/charts";
import { Paper, Group, rem } from "@mantine/core";

const FeedbackBarChart = () => {
  const { data: feedbackData } = useFetchUserFeedback();
  const PRIMARY_COL_HEIGHT = rem(470);
  const WIDTH_RATIO = rem(280);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  // console.log("🚀 ~ FeedbackBarChart ~ data:", data);
  return (
    <Paper withBorder shadow="md" p={10} radius="md">
      <Group mb={2} justify="flex-end">
        {/* <Title order={6}>Feedbacks Total Rating</Title> */}
        <ViewFeedbackmodal />
      </Group>

      <BarChart
        h={SECONDARY_COL_HEIGHT}
        // orientation="vertical"
        yAxisProps={{ width: 80 }}
        w={WIDTH_RATIO}
        data={feedbackData}
        dataKey="category"
        unit="⭐"
        series={[{ name: `Rating`, color: "violet.6" }]}
      />
    </Paper>
  );
};

export default FeedbackBarChart;
