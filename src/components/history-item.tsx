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

let formatTime = (time: Date | number): string => {
  if (typeof time === 'number') time = new Date(time)
  let hh = `${time.getHours()}`.padStart(2, '0')
  let mm = `${time.getMinutes()}`.padStart(2, '0')

  return `${hh}:${mm}`
}

let Timespan = ({ start, end }: { start: number; end: number }) => (
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

let StartTime = ({ time }: { time: number }) => (
  <span className={styles.statement}>
    up at <span className={styles.up}>{formatTime(time)}</span>
  </span>
)

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
