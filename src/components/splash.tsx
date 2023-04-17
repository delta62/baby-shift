import styles from './splash.module.scss'

export let Splash = () => (
  <div className={styles.splash}>
    <i className={styles.spinner} />
    <h2>loading</h2>
  </div>
)
