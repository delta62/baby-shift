import { HistoryItem } from '@components'
import { useGetLogsQuery } from '@clients'
import { getHistoryAsItems } from '@store'
import styles from './history-list.module.scss'

export let HistoryList = () => {
  let { items } = useGetLogsQuery(undefined, {
    pollingInterval: 1_000 * 60 * 5,
    refetchOnFocus: true,
    selectFromResult: getHistoryAsItems,
  })

  return (
    <>
      <h3 className={styles.header}>Past events</h3>
      <hr className={styles.divider} />
      <div className={styles.scrollContainer}>
        <ol className={styles.list}>
          {items.map(item => (
            <HistoryItem key={item.up} {...item} />
          ))}
        </ol>
      </div>
    </>
  )
}
