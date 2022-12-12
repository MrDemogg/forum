import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ForumState {
  error: string | null,
  token: string | null,
  userId: string | null
}

const initialState: ForumState = {
  error: null,
  token: null,
  userId: null
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setError(state, actions: PayloadAction<string | null>) {
      state.error = actions.payload
    },
    setToken(state, actions: PayloadAction<string | null>) {
      state.token = actions.payload
    },
    setId(state, actions: PayloadAction<string | null>) {
      state.userId = actions.payload
    }
  }
})

export default forumSlice.reducer