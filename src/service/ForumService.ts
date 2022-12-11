import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IProfile} from "../models/IProfile";
import {ILoginResponse} from "../models/ILoginResponse";
import {IPost} from "../models/IPost";
import {IComment} from "../models/IComment";

export const forumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Get'],
  endpoints: (build) => ({
    registration: build.mutation<string, IProfile>({
      query: args => ({
        url: '/users',
        method: 'POST',
        body: args
      })
    }),
    login: build.mutation<ILoginResponse, IProfile>({
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
    postPost: build.mutation<string, IPost>({
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
    postComment: build.mutation<string, IComment>({
      query: args => ({
        url: '/comments',
        method: 'POST',
        headers: {
          Token: args.token
        },
        body: {
          text: args.text,
          post: args.post
        }
      }),
      invalidatesTags: ['Get']
    })
  })
})