import { formatTime } from '../format'
import styles from './timespan.module.scss'

export let Timespan = ({ start, end }: { start: number; end: number }) => (
  <>
    <span className={styles.statement}>
      <span className={styles.up}>{formatTime(start)}</span>
    </span>
    -
    <span className={styles.statement}>
      <span className={styles.up}>{formatTime(end)}</span>
    </span>
  </>
)
