import {
  CurrentTime,
  Status,
  Toggle,
  HistoryList,
  HistoryForm,
  Splash,
} from '@components'
import { useRedirect } from '@delta62/micro-router'
import { State, getIsAsleep, getIsLoggedIn, getMostRecentLog } from '@store'
import { useSelector } from 'react-redux'
import { useGetHistoryState } from '@clients'
import styles from './main-page.module.scss'

export let MainPage = () => {
  let isLoggedIn = useSelector<State>(getIsLoggedIn)
  let { data: history = [], isLoading, error } = useGetHistoryState(undefined)
  let latest = getMostRecentLog(history)
  let isAwake = !getIsAsleep(history)
  useRedirect({ to: '/login', when: !isLoggedIn })

  return (
    <div className={`${styles.wrapper} ${isAwake ? '' : styles.asleep}`}>
      {(isLoading || error) && <Splash />}
      <section className={styles.time}>
        <CurrentTime />
      </section>
      <section className={styles.status}>
        <Status />
        <Toggle />
        {isAwake && <HistoryForm id={latest!.id} />}
      </section>
      <section className={styles.history}>
        <HistoryList />
      </section>
    </div>
  )
}
