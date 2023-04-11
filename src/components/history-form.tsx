import { BottleForm, Tab, TabApi } from '@components'
import styles from './history-form.module.scss'

let renderBottleForm = ({ deselect }: TabApi) => (
  <BottleForm onSubmit={deselect} />
)

let renderDiaperForm = ({ deselect }: TabApi) => <p>DIapler time</p>

export let HistoryForm = () => {
  return (
    <div className={styles.verticalTabs}>
      <Tab label="Log bottle" renderChildren={renderBottleForm} />
      <Tab label="Log diaper" renderChildren={renderDiaperForm} />
    </div>
  )
}
