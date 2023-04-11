import { createApi } from '@reduxjs/toolkit/query/react'
import { History } from '@components'
import firebaseQuery from './firebase'

export type UpdateArgs = Partial<History>

export let historyApi = createApi({
  baseQuery: firebaseQuery,
  tagTypes: ['History'],
  endpoints: build => ({
    addLog: build.mutation({
      invalidatesTags: ['History'],
      query: (document: History) => ({
        path: 'history',
        type: 'create',
        document,
      }),
    }),
    updateLog: build.mutation({
      invalidatesTags: ['History'],
      query: (update: UpdateArgs) => ({
        path: `history/${update.id}`,
        type: 'update',
        document: update,
      }),
    }),
    getLogs: build.query<History[], void>({
      providesTags: ['History'],
      query: () => ({
        path: 'history',
        type: 'list',
        orderBy: 'id desc',
        pageSize: 25,
      }),
    }),
  }),
})

export let { useMutation: useAddLogMutation } = historyApi.endpoints.addLog
export let { useMutation: useUpdateLogMutation } =
  historyApi.endpoints.updateLog
export let { useGetLogsQuery } = historyApi
export let { useQueryState: useGetHistoryState } = historyApi.endpoints.getLogs
