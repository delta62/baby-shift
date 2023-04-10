import { State, tokenRefreshed } from '@store'
import { create, list, refreshToken, update } from '@delta62/firebase-client'
import {
  BaseQueryApi,
  QueryReturnValue,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes'

export interface CreateRequest {
  type: 'create'
  path: string
  document: any
}

export interface ListRequest {
  type: 'list'
  path: string
  orderBy?: string
  pageSize?: number
}

export interface UpdateRequest {
  type: 'update'
  path: string
  document: any
}

export type FirebaseArgs = CreateRequest | ListRequest | UpdateRequest

let firebaseQuery = async <R>(
  args: FirebaseArgs,
  { dispatch, getState }: BaseQueryApi
): Promise<QueryReturnValue<R, string, {}>> => {
  let { auth } = getState() as State

  if (!auth?.refreshToken) {
    return { error: 'Not logged in' }
  }

  if (auth.expires <= Date.now() - 60_000) {
    let newAuth = await refreshToken(API_KEY)(auth.refreshToken)
    auth = { ...auth, ...newAuth }
    dispatch(tokenRefreshed(newAuth))
  }

  switch (args.type) {
    case 'create':
      await create(PROJECT_ID)({
        path: args.path,
        authToken: auth.idToken,
        document: args.document,
        documentId: args.document.id,
      })
      return { data: null as R }
    case 'list':
      let response = await list(PROJECT_ID)({
        path: args.path,
        authToken: auth.idToken,
        orderBy: args.orderBy,
        pageSize: args.pageSize,
      })
      let data = response.documents as R
      return { data }
    case 'update':
      await update(PROJECT_ID)({
        path: args.path,
        document: args.document,
        authToken: auth.idToken,
      })
      return { data: null as R }
  }
}

export default firebaseQuery
