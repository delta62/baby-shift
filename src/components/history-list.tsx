import { HistoryItem } from '@components'
import { useGetLogsQuery } from '@clients/history'
import styles from './history-list.module.scss'

export let HistoryList = () => {
  let { items } = useGetLogsQuery(undefined, {
    pollingInterval: 15_000,
    selectFromResult: ({ data }) => ({
      items: data?.slice().sort((a: any, b: any) => b.up - a.up) ?? [],
    }),
  })

  return (
    <>
      <h3 className={styles.header}>Past events</h3>
      <hr className={styles.divider} />
      <div className={styles.scrollContainer}>
        <ol className={styles.list}>
          {items.map((item: any) => (
            <HistoryItem key={item.up} {...item} />
          ))}
        </ol>
      </div>
    </>
  )
}
