import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComment } from "../types/Comments";
import { IUser } from "../types/User";

export const commentsApi = createApi({
  reducerPath: "commentsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_HOST}/`,
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

    addComment: build.mutation<IComment, IComment>({
      query: (comment) => ({
        url: "comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["comments"],
    }),

    changeComment: build.mutation<void, IComment>({
      query: (comment) => ({
        url: "comments/" + comment.id,
        method: "PUT",
        body: comment,
      }),
      invalidatesTags: ["comments"],
    }),
    deleteComment: build.mutation<void, number>({
      query: (id) => ({
        url: "comments/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
  }),
});
