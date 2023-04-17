import { useGetHistoryState } from '@clients'
import { getIsAsleep } from '@store'
import styles from './status.module.scss'

export let Status = () => {
  let { data: history = [] } = useGetHistoryState(undefined)
  let isAsleep = getIsAsleep(history)
  let status = isAsleep ? ('asleep' as const) : ('awake' as const)
  let emoji = isAsleep ? '😴' : '👶'

  return (
    <>
      <h1>{emoji}</h1>
      <h2 className={styles.center}>
        The baby is <span className={styles[status]}>{status}</span>
      </h2>
    </>
  )
}
