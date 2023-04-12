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

let formatDuration = (start: number, end: number | null): string => {
  if (!end) return '--'
  let delta = (end - start) / 1000
  let mm = Math.round(delta % 60)
  let hh = Math.floor(delta / 3600)

  return `${hh}:${mm}`
}

export interface Props {
  bottles?: number[]
  diapers?: number[]
  startTime: number
  endTime: number | null
}

export let Stats = ({ bottles, diapers, startTime, endTime }: Props) => {
  let bottleVolume = bottleSum(bottles)
  let pooVolume = pooSum(diapers)
  let peeVolume = peeSum(diapers)
  let duration = formatDuration(startTime, endTime)

  return (
    <div className={styles.stats}>
      <span className={`${styles.stat} ${styles.wideStat}`}>🕑 {duration}</span>
      <span className={`${styles.stat} ${styles.wideStat}`}>
        🍼 {bottleVolume}
      </span>
      <span className={styles.stat}>💦 {peeVolume}</span>
      <span className={styles.stat}>💩 {pooVolume}</span>
    </div>
  )
}
