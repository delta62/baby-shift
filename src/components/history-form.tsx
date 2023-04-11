import { MouseEvent, PropsWithChildren, useCallback, useState } from 'react'
import classNames from 'classnames'
import { BottleForm } from '@components'
import styles from './history-form.module.scss'

export interface TabProps {
  label: string
}

export let Tab = ({ children, label }: PropsWithChildren<TabProps>) => {
  let [selected, setSelected] = useState(false)

  let onClick = useCallback(
    (event: MouseEvent) => {
      if ((event.target as Element).tagName === 'INPUT') return
      setSelected(state => !state)
    },
    [setSelected]
  )

  return (
    <div
      className={classNames(styles.tab, { [styles.selected]: selected })}
      onClick={onClick}
    >
      <div className={styles.half}>
        <span className={styles.grow}>{label}</span>
        <i className={styles.chevronRight} />
      </div>
      <div className={styles.half}>
        <i className={styles.chevronLeft} />
        <div className={classNames(styles.grow, styles.content)}>
          {children}
        </div>
      </div>
    </div>
  )
}

export let HistoryForm = () => {
  return (
    <div className={styles.verticalTabs}>
      <Tab label="Log bottle">
        <BottleForm />
      </Tab>
      <Tab label="Log diaper" />
    </div>
  )
}
