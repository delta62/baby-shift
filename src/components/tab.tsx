import { MouseEvent, useCallback, useState } from 'react'
import styles from './tab.module.scss'

export interface TabApi {
  deselect(): void
}

export interface Props {
  label: string
  renderChildren(api: TabApi): JSX.Element
}

export let Tab = ({ renderChildren, label }: Props) => {
  let [selected, setSelected] = useState(false)
  let className = [styles.tab, selected && styles.selected]
    .filter(x => !!x)
    .join(' ')

  let deselect = useCallback(() => {
    setSelected(false)
  }, [setSelected])

  let onClick = useCallback(
    (event: MouseEvent) => {
      if ((event.target as Element).tagName === 'INPUT') return
      setSelected(state => !state)
    },
    [setSelected]
  )

  return (
    <div className={className} onClick={onClick}>
      <div className={styles.half}>
        <span className={styles.grow}>{label}</span>
        <i className={styles.chevronRight} />
      </div>
      <div className={styles.half}>
        <i className={styles.chevronLeft} />
        <div className={`${styles.grow} ${styles.content}`}>
          {renderChildren({ deselect })}
        </div>
      </div>
    </div>
  )
}
