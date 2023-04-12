import styles from './stats.module.scss'

let bottleSum = (bottles?: number[]): string => {
  if (!bottles) return '--'
  let sum = bottles.reduce((sum, x) => sum + x)
  return `${sum}oz`
}

let pooSum = (diapers?: number[]): string => {
  if (!diapers) return '--'
  let sum = diapers.filter(x => x === 2).length
  return `${sum}`
}

let peeSum = (diapers?: number[]): string => {
  if (!diapers) return '--'
  let sum = diapers.filter(x => x === 1).length
  return `${sum}`
}

export interface Props {
  bottles?: number[]
  diapers?: number[]
}

export let Stats = ({ bottles, diapers }: Props) => {
  let bottleVolume = bottleSum(bottles)
  let pooVolume = pooSum(diapers)
  let peeVolume = peeSum(diapers)

  return (
    <div className={styles.stats}>
      <span className={styles.stat}>🍼 {bottleVolume}</span>
      <span className={styles.stat}>💩 {pooVolume}</span>
      <span className={styles.stat}>💦 {peeVolume}</span>
    </div>
  )
}
