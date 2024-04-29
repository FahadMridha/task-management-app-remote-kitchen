import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  production => "https://662a5c1567df268010a39a2d.mockapi.io/api/v1"
// development => "http://localhost:5000/api/v1";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://662a5c1567df268010a39a2d.mockapi.io/api/v1",
  }),
  tagTypes: ["task"],
  endpoints: () => ({}),
});
