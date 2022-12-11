import {combineReducers, configureStore} from "@reduxjs/toolkit";
import forumReducer from './reducers/ForumSlice'
import {forumAPI} from "../service/ForumService";

const rootReducer = combineReducers({
  forumReducer,
  [forumAPI.reducerPath]: forumAPI.reducer
})

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(forumAPI.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']