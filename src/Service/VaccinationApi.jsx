import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GetAuthToken from "../Component/Layout/GetAuthToken";

export const VaccinationApi = createApi({
  reducerPath: "VaccinationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7094",
    credentials: "include",
  }),
  tagTypes: ["Vaccination"],

  endpoints: (builder) => ({
    createVaccination: builder.mutation({
      query: (Vaccination) => {
        const token = GetAuthToken();
        return {
          url: "/api/Vaccination/add",
          method: "POST",
          body: Vaccination,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Vaccination"],
    }),

    GetAllVaccination: builder.query({
      query: () => {
        const token = GetAuthToken();
        return {
          url: "/api/Vaccination/getAll",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Vaccination"],
    }),

    GetVaccinationById: builder.query({
      query: (id) => {
        const token = GetAuthToken();
        return {
          url: `/api/Vaccination/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Vaccination"],
    }),
  }),
});

export const {
  useCreateVaccinationMutation,
  useGetAllVaccinationQuery,
  useGetVaccinationByIdQuery,
} = VaccinationApi;
