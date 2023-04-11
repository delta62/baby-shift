import styles from './version.module.scss'

export interface Props {
  version: string
}

export let Version = ({ version }: Props) => (
  <p className={styles.version}>v{version}</p>
)
