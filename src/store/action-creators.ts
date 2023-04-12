import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { login as fbLogin, signup as fbSignup } from '@delta62/firebase-client'
import { RefreshResponse } from '@delta62/firebase-client'

export interface AuthArgs {
  email: string
  password: string
}

export let signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password }: AuthArgs) =>
    await fbSignup(API_KEY)(email, password)
)

export let login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: AuthArgs) =>
    await fbLogin(API_KEY)(email, password)
)

export let tokenRefreshed = createAction<RefreshResponse>('TOKEN_REFRESHED')
