import { Badge, Stats, Timespan, StartTime, EditHistory } from '@components'
import styles from './history-item.module.scss'
import { MouseEvent, useCallback, useState } from 'react'

export interface History {
  id: string
  bottles?: number[]
  diapers?: number[]
  down: number | null
  emoji: string
  up: number
  whom: string
}

export let HistoryItem = (history: History) => {
  let [expanded, setExpanded] = useState(false)
  let { up, down, bottles, emoji, diapers, whom } = history

  let onClick = useCallback(
    (event: MouseEvent) => {
      let target = event.target as Element
      if (target.tagName === 'INPUT') return
      setExpanded(val => !val)
    },
    [setExpanded]
  )

  return (
    <li className={styles.wrapper} onClick={onClick}>
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
        {expanded && <EditHistory item={history} />}
      </div>
    </li>
  )
}
