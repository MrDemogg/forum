import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

export const forumAPI = createApi({
  reducerPath: 'forumAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (build) => ({

  })
})