import {
  CurrentTime,
  Status,
  Toggle,
  HistoryList,
  HistoryForm,
  Splash,
  Version,
} from '@components'
import { useRedirect } from '@delta62/micro-router'
import { State, getIsAsleep, getIsLoggedIn } from '@store'
import { useSelector } from 'react-redux'
import { useGetHistoryState } from '@clients'
import styles from './main-page.module.scss'

export let MainPage = () => {
  let isLoggedIn = useSelector<State>(getIsLoggedIn)
  let { data: history = [], isLoading } = useGetHistoryState(undefined)
  let isAwake = !getIsAsleep(history)
  useRedirect({ to: '/login', when: !isLoggedIn })

  return (
    <div className={`${styles.wrapper} ${isAwake ? '' : styles.asleep}`}>
      <Version version={VERSION} />
      {isLoading && <Splash />}
      <section className={styles.time}>
        <CurrentTime />
      </section>
      <section className={styles.status}>
        <Status />
        <Toggle />
        {isAwake && <HistoryForm />}
      </section>
      <section className={styles.history}>
        <HistoryList />
      </section>
    </div>
  )
}
