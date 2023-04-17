import { formatTime } from '../format'
import styles from './start-time.module.scss'

export let StartTime = ({ time }: { time: number }) => (
  <span className={styles.statement}>
    up at <span className={styles.up}>{formatTime(time)}</span>
  </span>
)
