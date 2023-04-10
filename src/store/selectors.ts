import { History } from '@components'
import { createSelector } from '@reduxjs/toolkit'
import { State } from '@store'

type QuerySelector<D, R extends Record<string, any>> = (arg: { data?: D }) => R

export let getIsLoggedIn = (state: State): boolean => !!state.auth

export let getUserId = (state: State): string =>
  state.auth?.email.match(/^\w+/)?.[0] ?? 'somebody'

export let getMostRecentLog = (history: History[]): History | null =>
  history[0] ?? null

export let getIsAsleep = createSelector(
  getMostRecentLog,
  (recent: History | null): boolean => !!recent?.down
)

export let getHistoryAsItems: QuerySelector<
  History[],
  { items: History[] }
> = ({ data }) => ({
  items: data ?? [],
})
