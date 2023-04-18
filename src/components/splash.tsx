import { useGetHistoryState } from '@clients'
import styles from './splash.module.scss'

export let Splash = () => {
  let { error } = useGetHistoryState(undefined)

  return (
    <div className={styles.splash}>
      <i className={styles.spinner} />
      <h2>loading</h2>
      {error && <p className={styles.error}>{error.toString()}</p>}
    </div>
  )
}
