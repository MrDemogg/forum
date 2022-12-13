import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ForumState {
  errorInfo: string | null,
  token: string | null,
  userId: string | null,
  globalIsError: boolean,
  globalIsLoading: boolean
}

const initialState: ForumState = {
  errorInfo: null,
  token: null,
  userId: null,
  globalIsError: false,
  globalIsLoading: false
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
    },
    changeGlobalIsLoading(state, action: PayloadAction<boolean>) {
      state.globalIsLoading = action.payload
    }
  }
})

export default forumSlice.reducer