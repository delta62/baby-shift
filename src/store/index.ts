import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { auth } from './reducers'
import persistState from 'redux-localstorage'
import { historyApi } from '@clients/history'

let store = configureStore({
  reducer: { auth, [historyApi.reducerPath]: historyApi.reducer },
  enhancers: [persistState(['auth'])],
  middleware: getDefaultMiddleware().concat([historyApi.middleware]),
})

export * from './selectors'
export * from './action-creators'

export type State = ReturnType<typeof store['getState']>
export type Dispatch = typeof store['dispatch']

export default store
