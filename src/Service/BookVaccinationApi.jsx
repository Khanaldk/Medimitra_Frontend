import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GetAuthToken from "../Component/Layout/GetAuthToken";

export const BookVaccinationApi = createApi({
  reducerPath: "BookVaccinationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7094",
    credentials: "include",
  }),
  tagTypes: ["BookVaccination"],

  endpoints: (builder) => ({
    createBookVaccination: builder.mutation({
      query: (BookVaccination) => {
        const token = GetAuthToken();
        return {
          url: "/api/BookingVaccination/add",
          method: "POST",
          body: BookVaccination,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["BookVaccination"],
    }),

    GetAllUserBookVaccination: builder.query({
      query: () => {
        const token = GetAuthToken();
        return {
          url: "/api/BookingVaccination/getBookVaccinationOfCurrentUser",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["BookVaccination"],
    }),

    GetAllBookVaccination: builder.query({
      query: () => {
        const token = GetAuthToken();
        return {
          url: "/api/BookingVaccination/getAllBookVaccination",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["BookVaccination"],
    }),

    PeekNextBookingVaccination: builder.query({
      query: () => {
        const token = GetAuthToken();
        return {
          url: "/api/BookingVaccination/peeknextBooking",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["BookVaccination"],
    }),
  }),
});

export const {
  useCreateBookVaccinationMutation,
  useGetAllUserBookVaccinationQuery,
  useGetAllBookVaccinationQuery,
  usePeekNextBookingVaccinationQuery,
} = BookVaccinationApi;
