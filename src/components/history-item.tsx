import { Badge, Stats, Timespan, StartTime } from '@components'
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
      <span className={styles.emoji}>{emoji}</span>
      <div className={styles.vertical}>
        <div className={styles.item}>
          {down ? <Timespan start={up} end={down} /> : <StartTime time={up} />}
          <Badge text={whom} />
        </div>
        <Stats
          bottles={bottles}
          diapers={diapers}
          startTime={up}
          endTime={down}
        />
      </div>
    </li>
  )
}
