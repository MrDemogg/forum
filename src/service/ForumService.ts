import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IProfileRequest} from "../models/IProfileRequest";
import {IProfileResponse} from "../models/IProfileResponse";
import {IPosts} from "../models/IPosts";
import {IComments} from "../models/IComments";

export const forumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Get'],
  endpoints: (build) => ({
    registration: build.mutation<string, IProfileRequest>({
      query: args => ({
        url: '/users',
        method: 'POST',
        body: args
      })
    }),
    login: build.mutation<IProfileResponse, IProfileRequest>({
      query: args => ({
        url: '/users/sessions',
        method: 'POST',
        body: args
      }),
      invalidatesTags: ['Get']
    }),
    logout: build.mutation<string, string>({
      query: arg => ({
        url: '/users',
        method: 'PATCH',
        headers: {
          Token: arg
        }
      }),
      invalidatesTags: ['Get']
    }),
    postPost: build.mutation<string, IPosts>({
      query: args => ({
        url: '/posts',
        method: 'POST',
        headers: {
          Token: args.token
        },
        body: {
          title: args.title,
          description: args.description ? args.description : undefined,
          image: args.image ? args.image : undefined
        }
      }),
      invalidatesTags: ['Get']
    }),
    postComment: build.mutation<string, IComments>({
      query: args => ({
        url: '/comments',
        method: 'POST',
        headers: {
          Token: args.token,
        },
        body: {
          text: args.text,
          post: args.post
        }
      }),
      invalidatesTags: ['Get']
    }),
    findPosts: build.query<IPosts[], undefined>({
      query: arg => ({
        url: '/posts',
        method: 'GET'
      }),
      providesTags: result => ['Get']
    }),
    findComments: build.query<IComments[], undefined>({
      query: arg => ({
        url: '/comments',
        method: 'GET'
      }),
      providesTags: result => ['Get']
    })
  })
})