import MainRoutes from "./routes/MainRoutes";
import {
  MantineProviders,
  ReactQueryProvider,
  ReduxProviders,
} from "./services/providers";
const App = () => {
  // http://localhost:5000/
  return (
    <ReduxProviders>
      <ReactQueryProvider>
        <MantineProviders>
          <MainRoutes />
        </MantineProviders>
      </ReactQueryProvider>
    </ReduxProviders>
  );
};

export default App;
