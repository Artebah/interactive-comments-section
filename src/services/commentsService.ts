import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComment } from "../types/Comments";
import { IUser } from "../types/User";

// process.env.API_HOST

export const commentsApi = createApi({
  reducerPath: "commentsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  tagTypes: ["comments"],
  endpoints: (build) => ({
    getComments: build.query<IComment[], void>({
      query: () => ({
        url: "comments",
      }),
      providesTags: ["comments"],
    }),
    getCurrentUser: build.query<IUser, void>({
      query: () => ({
        url: "current-user",
      }),
    }),
    addComment: build.mutation<IComment, Omit<IComment, "id">>({
      query: (comment) => ({
        url: "comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});
