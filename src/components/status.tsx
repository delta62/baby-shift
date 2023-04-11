import { History } from '@components'
import { useGetHistoryState } from '@clients'
import { getIsAsleep, getMostRecentLog } from '@store'
import styles from './status.module.scss'

let bottleSum = (history: History | null): string => {
  if (!history?.bottles) return '--'
  let sum = history.bottles.reduce((sum, x) => sum + x)
  return `${sum}oz`
}

export let Status = () => {
  let { data: history = [] } = useGetHistoryState(undefined)
  let latest = getMostRecentLog(history)
  let isAsleep = getIsAsleep(history)
  let status = isAsleep ? ('asleep' as const) : ('awake' as const)
  let emoji = isAsleep ? '😴' : '👶'

  return (
    <>
      <h1>{emoji}</h1>
      <h2 className={styles.center}>
        The baby is currently <span className={styles[status]}>{status}</span>
      </h2>
    </>
  )
}
