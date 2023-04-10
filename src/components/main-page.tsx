import { CurrentTime, Status, Toggle, HistoryList } from '@components'
import { Redirect } from '@delta62/micro-router'
import { State, getIsLoggedIn } from '@store'
import { useSelector } from 'react-redux'
import styles from './main-page.module.scss'

export let MainPage = () => {
  let isLoggedIn = useSelector<State>(getIsLoggedIn)

  return (
    <>
      <Redirect to="/login" when={!isLoggedIn} />
      <section className={`${styles.one} ${styles.center}`}>
        <CurrentTime />
      </section>
      <Status />
      <Toggle />
      <section className={styles.two}>
        <HistoryList />
      </section>
    </>
  )
}
