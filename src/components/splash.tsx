import { useGetLogsQuery } from '@clients'
import { SerializedError } from '@reduxjs/toolkit'
import styles from './splash.module.scss'

let LoadingSpinner = () => (
  <>
    <i className={styles.spinner} />
    <h2>loading</h2>
  </>
)

interface LoadFailedProps {
  error: string | SerializedError
  onRetry(): void
  isFetching: boolean
}

let LoadFailed = ({ onRetry, error, isFetching }: LoadFailedProps) => {
  let errorMessage = typeof error === 'string' ? error : error?.message

  return (
    <>
      <p>An error occurred while loading the app: </p>
      <pre className={styles.error}>{errorMessage}</pre>
      <button
        type="button"
        className={styles.button}
        onClick={onRetry}
        disabled={isFetching}
      >
        Retry
      </button>
    </>
  )
}

export let Splash = () => {
  let { refetch, error, isFetching } = useGetLogsQuery(undefined)

  return (
    <div className={styles.splash}>
      {error ? (
        <LoadFailed onRetry={refetch} isFetching={isFetching} error={error} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  )
}
