import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IProfileRequest} from "../models/IProfileRequest";
import {IProfileResponse} from "../models/IProfileResponse";
import {IPostsResponse} from "../models/IPostsResponse";
import {ICommentsResponse} from "../models/ICommentsResponse";
import {IPostsRequest} from "../models/IPostsRequest";
import {ICommentsRequest} from "../models/ICommentsRequest";
import {ILogout} from "../models/ILogout";

export const forumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Get'],
  endpoints: (build) => ({
    registration: build.mutation<string, IProfileRequest>({
      query: args => ({
        url: '/users',
        method: 'POST',
        body: args,
        responseHandler: response => response.text()
      })
    }),
    login: build.mutation<IProfileResponse, IProfileRequest>({
      query: args => ({
        url: '/users/sessions',
        method: 'POST',
        body: args,
        responseHandler: response => response.text()
      }),
      invalidatesTags: ['Get']
    }),
    logout: build.mutation<string, ILogout>({
      query: args => ({
        url: '/users',
        method: 'PATCH',
        headers: {
          Token: args.token,
          Id: args.userId
        },
        responseHandler: response => response.text()
      }),
      invalidatesTags: ['Get']
    }),
    isUserExists: build.mutation<string, string>({
      query: arg => ({
        url: '/users/test',
        method: 'POST',
        headers: {
          Id: arg
        },
        responseHandler: response => response.text()
      })
    }),
    postPost: build.mutation<string, IPostsRequest>({
      query: args => ({
        url: '/posts',
        method: 'POST',
        headers: {
          Token: args.token,
          Id: args.userId
        },
        body: {
          title: args.title,
          description: args.description ? args.description : undefined,
          image: args.image ? args.image : undefined
        },
        responseHandler: response => response.text()
      }),
      invalidatesTags: ['Get']
    }),
    postComment: build.mutation<string, ICommentsRequest>({
      query: args => ({
        url: '/comments',
        method: 'POST',
        headers: {
          Token: args.token,
          Id: args.userId
        },
        body: {
          text: args.text,
          post: args.post
        },
        responseHandler: response => response.text()
      }),
      invalidatesTags: ['Get']
    }),
    findPosts: build.query<IPostsResponse[], undefined>({
      query: () => ({
        url: '/posts',
        method: 'GET'
      }),
      providesTags: result => ['Get']
    }),
    findComments: build.query<ICommentsResponse[], undefined>({
      query: () => ({
        url: '/comments',
        method: 'GET'
      }),
      providesTags: result => ['Get']
    })
  })
})