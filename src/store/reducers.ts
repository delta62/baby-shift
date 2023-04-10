import { createReducer } from '@reduxjs/toolkit'
import { signup, login, tokenRefreshed } from './action-creators'
import { Login } from '@delta62/firebase-client/dist/auth'

export type State = Login | null

export let auth = createReducer<State>(null, builder => {
  builder
    .addCase(signup.fulfilled, (_state, action) => action.payload)
    .addCase(login.fulfilled, (_state, action) => action.payload)
    .addCase(tokenRefreshed, (state, action) => ({
      ...state!,
      ...action.payload,
    }))
})
