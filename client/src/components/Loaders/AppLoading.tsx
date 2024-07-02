import { LoadingOverlay, Loader, Text, Stack } from "@mantine/core";

type LoadingProps = {
  isLoading: boolean;
};
export const AppLoading = ({ isLoading }: LoadingProps) => {
  return (
    <>
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{
          children: (
            <Stack align="center">
              <Loader size={40} />
              <Text>Please wait....</Text>
            </Stack>
          ),
        }}
      />
    </>
  );
};
