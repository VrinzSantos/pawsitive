import { AppProviderInterface } from "@/interfaces";

import { QueryClient, QueryClientProvider } from "react-query";
export const ReactQueryClient = new QueryClient();
export const ReactQueryProvider = ({ children }: AppProviderInterface) => {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
