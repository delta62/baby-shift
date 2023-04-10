import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { History } from '@components'
import { State, tokenRefreshed } from '@store'
import { create, list, refreshToken, update } from '@delta62/firebase-client'

export interface CreateRequest {
  type: 'create'
  path: string
  document: any
}

export interface ListRequest {
  type: 'list'
  path: string
}

export interface UpdateRequest {
  type: 'update'
  path: string
  document: any
}

export type FirebaseArgs = CreateRequest | ListRequest | UpdateRequest

let baseQuery: BaseQueryFn<FirebaseArgs, any, string> = async (
  args,
  { dispatch, getState }
) => {
  let { auth } = getState() as State

  if (!auth || !auth.refreshToken) {
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
      return { data: null }
    case 'list':
      let response = await list(PROJECT_ID)({
        path: args.path,
        authToken: auth.idToken,
      })
      let data = response.documents
      return { data }
    case 'update':
      await update(PROJECT_ID)({
        path: args.path,
        document: args.document,
        authToken: auth.idToken,
      })
      return { data: null }
  }
}

export interface UpdateArgs {
  id: string
  down: number
}

export let historyApi = createApi({
  baseQuery,
  endpoints: build => ({
    addLog: build.mutation({
      query: (document: History) => ({
        path: 'history',
        type: 'create',
        document,
      }),
    }),
    updateLog: build.mutation({
      query: (update: UpdateArgs) => ({
        path: `history/${update.id}`,
        type: 'update',
        document: { down: update.down },
      }),
    }),
    getLogs: build.query({
      query: () => ({
        path: 'history',
        type: 'list',
      }),
    }),
  }),
})

export let { useMutation: useAddLogMutation } = historyApi.endpoints.addLog
export let { useMutation: useUpdateLogMutation } =
  historyApi.endpoints.updateLog
export let { useGetLogsQuery } = historyApi
export let { useQueryState: useGetHistoryState } = historyApi.endpoints.getLogs
