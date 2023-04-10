import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { login as fbLogin, signup as fbSignup } from '@delta62/firebase-client'
import { Refresh } from '@delta62/firebase-client/dist/auth'

export interface SignupArgs {
  email: string
  password: string
}

export type LoginArgs = SignupArgs

export let signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }: SignupArgs) => {
    return await fbSignup(API_KEY)(email, password)
  }
)

export let login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginArgs) => {
    return await fbLogin(API_KEY)(email, password)
  }
)

export let tokenRefreshed = createAction<Refresh>('TOKEN_REFRESHED')