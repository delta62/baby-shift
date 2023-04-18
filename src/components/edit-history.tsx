import { BottleForm, DiaperForm, TimeForm } from '@components'
import { History } from './history-item'
import styles from './edit-history.module.scss'

export interface Props {
  item: History
}

export let EditHistory = ({ item }: Props) => {
  return (
    <div className={styles.editHistory}>
      <b>Adjust time</b>
      <TimeForm item={item} />
      <b>Add logs</b>
      <BottleForm id={item.id} />
      <DiaperForm id={item.id} />
    </div>
  )
}
