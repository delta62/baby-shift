import { useTime } from '@hooks'
import styles from './current-time.module.scss'

let formatTime = (date: Date) => {
  let hh = `${date.getHours()}`.padStart(2, '0')
  let mm = `${date.getMinutes()}`.padStart(2, '0')
  let ss = `${date.getSeconds()}`.padStart(2, '0')

  return `${hh}:${mm}:${ss}`
}

export let CurrentTime = () => {
  let time = useTime()()
  let hms = formatTime(time)

  return (
    <time className={styles.currentTime} dateTime={hms}>
      {hms}
    </time>
  )
}
