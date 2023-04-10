import { HistoryItem } from '@components'
import styles from './history-list.module.scss'
import { useGetLogsQuery } from '@clients/history'

export let HistoryList = () => {
  let { data = [] } = useGetLogsQuery(undefined)

  return (
    <ol className={styles.list}>
      {data.map((item: any) => (
        <HistoryItem key={item.up} {...item} />
      ))}
    </ol>
  )
}
