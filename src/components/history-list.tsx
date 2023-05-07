import { HistoryItem } from '@components'
import { useGetLogsQuery } from '@clients'
import { getHistoryByDateAsItems } from '@store'
import styles from './history-list.module.scss'


export let HistoryList = () => {
  let { items } = useGetLogsQuery(undefined, {
    pollingInterval: 1_000 * 60 * 5,
    refetchOnFocus: true,
    selectFromResult: getHistoryByDateAsItems,
  })

  return (
    <div className={styles.scrollContainer}>
      <ol className={styles.group}>
        { Object.keys(items).map(key =>
          <li key={key}>
            <h4>{ new Date(key).toDateString() }</h4>
            <ol className={styles.list}>
              {items[key].map(item => (
                <HistoryItem key={item.up} {...item} />

              ))}
            </ol>
          </li>
        )}
      </ol>
    </div>
  )
}
