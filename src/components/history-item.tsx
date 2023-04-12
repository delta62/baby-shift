import { format } from 'date-fns'
import { Badge, Stats } from '@components'
import styles from './history-item.module.scss'

export interface History {
  id: string
  bottles?: number[]
  diapers?: number[]
  down: number | null
  emoji: string
  up: number
  whom: string
}

export let HistoryItem = ({
  emoji,
  up,
  down,
  whom,
  bottles,
  diapers,
}: History) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.item}>
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.statement}>
          up at <span className={styles.up}>{format(up, 'HH:mm')}</span>
        </span>
        {down && (
          <>
            /
            <span className={styles.statement}>
              down at{' '}
              <span className={styles.down}>{format(down, 'HH:mm')}</span>
            </span>
          </>
        )}
        <Badge text={whom} />
      </div>
      <Stats bottles={bottles} diapers={diapers} />
    </li>
  )
}
