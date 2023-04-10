import styles from './badge.module.scss'

export interface Props {
  text: string
}

export let Badge = ({ text }: Props) => (
  <span className={styles.badge}>{text}</span>
)
