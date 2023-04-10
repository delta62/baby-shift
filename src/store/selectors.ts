import { History } from '@components'
import { State } from '@store'

export let getIsLoggedIn = (state: State): boolean => !!state.auth

export let getUserId = (state: State): string =>
  state.auth?.email.match(/^\w+/)?.[0] ?? 'somebody'

export let getIsAsleep = (history: History[]): boolean =>
  history.slice().sort((a, b) => b.up - a.up)[0]?.down !== null

export let getMostRecentLog = (history: History[]): History | null =>
  history.slice().sort((a, b) => b.up - a.up)[0] ?? null
