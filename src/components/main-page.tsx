import {
  CurrentTime,
  Status,
  Toggle,
  HistoryList,
  HistoryForm,
  Version,
} from '@components'
import { Redirect } from '@delta62/micro-router'
import { State, getIsAsleep, getIsLoggedIn } from '@store'
import { useSelector } from 'react-redux'
import { useGetHistoryState } from '@clients'
import styles from './main-page.module.scss'

export let MainPage = () => {
  let isLoggedIn = useSelector<State>(getIsLoggedIn)
  let { data: history = [] } = useGetHistoryState(undefined)
  let isAwake = !getIsAsleep(history)

  return (
    <>
      <Version version={VERSION} />
      <Redirect to="/login" when={!isLoggedIn} />
      <section className={`${styles.one} ${styles.center}`}>
        <CurrentTime />
      </section>
      <Status />
      <Toggle />
      {isAwake && <HistoryForm />}
      <section className={styles.two}>
        <HistoryList />
      </section>
    </>
  )
}
