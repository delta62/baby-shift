import { History } from '@components'
import { createSelector } from '@reduxjs/toolkit'
import { State } from '@store'

type QueryArgs<D> = { data?: D }

export let getIsLoggedIn = (state: State): boolean => !!state.auth

export let getUserId = (state: State): string =>
  state.auth?.email.match(/^\w+/)?.[0] ?? 'somebody'

export let getMostRecentLog = (history: History[]): History | null =>
  history[0] ?? null

export let getHistoryLog = (history: History[], id: string): History | null => {
  return history.find(h => h.id === id) ?? null
}

export let getIsAsleep = createSelector(
  getMostRecentLog,
  (recent: History | null): boolean => !recent || !!recent.down
)

export let getHistoryByDateAsItems = ({ data }: QueryArgs<History[]>) => ({
  items: (data ?? []).reduce((acc, item) => {
    const date = new Date(item.up)

    // date.getMonth is zero-indexed
    const key = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`

    if (acc[key]) {
      acc[key].push(item)
    } else {
      acc[key] = [ item ]
    }

    return acc

  }, {} as Record<string, History[]>)
})
