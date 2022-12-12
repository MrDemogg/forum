import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ForumState {
  errorInfo: string | null,
  token: string | null,
  userId: string | null,
  globalIsError: boolean
}

const initialState: ForumState = {
  errorInfo: null,
  token: null,
  userId: null,
  globalIsError: false
}

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setError(state, actions: PayloadAction<string | null>) {
      state.errorInfo = actions.payload
    },
    setToken(state, actions: PayloadAction<string | null>) {
      state.token = actions.payload
    },
    setId(state, actions: PayloadAction<string | null>) {
      state.userId = actions.payload
    },
    changeGlobalIsError(state, action: PayloadAction<boolean>) {
      state.globalIsError = action.payload
    }
  }
})

export default forumSlice.reducer