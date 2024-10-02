import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Service/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { VaccinationApi } from "../Service/VaccinationApi";
import { BookVaccinationApi } from "../Service/BookVaccinationApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [VaccinationApi.reducerPath]: VaccinationApi.reducer,
    [BookVaccinationApi.reducerPath]: BookVaccinationApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      VaccinationApi.middleware,
      BookVaccinationApi.middleware
    ),
});

setupListeners(store.dispatch);
