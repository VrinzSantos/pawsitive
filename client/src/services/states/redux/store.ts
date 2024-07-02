import {
  configureStore,
  combineReducers,
  createAction,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import appSlice from "../redux/slices/appSlice";
import authSlice from "../redux/slices/authSlice";
import userSlice from "./slices/userSlice";
import inventorySlice from "./slices/inventorySlice";
import orderSlice from "./slices/orderSlice";
import clientSlice from "./slices/clientSlice";
// Encrypt transform configuration
const encryptor = encryptTransform({
  secretKey: "my-super-secret-key", // Use a secure key
  onError: function (error: Error) {
    // Handle the error
    console.error("Encryptor error:", error);
  },
});

// Persist configuration with encryption
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 1,
  storage,
  transforms: [encryptor],
};

// Combining reducers
const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  user: userSlice,
  inventory: inventorySlice,
  order: orderSlice,
  client: clientSlice,
});

// Redux state interface
export interface RootState {
  app: ReturnType<typeof appSlice>;
  auth: ReturnType<typeof authSlice>;
  user: ReturnType<typeof userSlice>;
  inventory: ReturnType<typeof inventorySlice>;
  order: ReturnType<typeof orderSlice>;
  client: ReturnType<typeof clientSlice>;
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Action creators and types
export const register = createAction("register");
export type AppDispatch = typeof store.dispatch;
