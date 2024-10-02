import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GetAuthToken from "../Component/Layout/GetAuthToken";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7094",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "api/Auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "api/Auth/login",
        method: "POST",
        body: user,
      }),
    }),
    forgotpassword: builder.mutation({
      query: (user) => ({
        url: "api/Auth/forgotpassword",
        method: "POST",
        body: user,
      }),
    }),
    resetpassword: builder.mutation({
      query: (user) => ({
        url: "api/Auth/reset-password",
        method: "POST",
        body: user,
      }),
    }),

    changePassword: builder.mutation({
      query: (user) => {
        console.log("user");
        console.log(user);

        const token = GetAuthToken();
        return {
          url: "/api/Auth/change-password",
          method: "PUT",
          body: user,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    changeUserRole: builder.mutation({
      query: (user) => {
        const token = GetAuthToken();
        return {
          url: "/api/Auth/ChangeUserRole",
          method: "PUT",
          body: user,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotpasswordMutation,
  useResetpasswordMutation,
  useChangePasswordMutation,
  useChangeUserRoleMutation,
} = authApi;
