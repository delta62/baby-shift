import styles from './stats.module.scss'

let bottleSum = (bottles?: number[]): string => {
  if (!bottles) return '--'
  let sum = bottles.reduce((sum, x) => sum + x)
  return `${sum}oz`
}

export interface Props {
  bottles?: number[]
}

export let Stats = ({ bottles }: Props) => {
  let bottleVolume = bottleSum(bottles)

  return (
    <div className={styles.stats}>
      <span className={styles.stat}>🍼 {bottleVolume}</span>
      <span className={styles.stat}>🚽 --</span>
      <span className={styles.stat}>💩 --</span>
      <span className={styles.stat}>💦 --</span>
    </div>
  )
}
