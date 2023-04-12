import { BottleForm, DiaperForm, Tab, TabApi } from '@components'
import styles from './history-form.module.scss'

let renderBottleForm = ({ deselect }: TabApi) => (
  <BottleForm onSubmit={deselect} />
)

let renderDiaperForm = ({ deselect }: TabApi) => (
  <DiaperForm onSubmit={deselect} />
)

export let HistoryForm = () => (
  <div className={styles.verticalTabs}>
    <Tab label="Log bottle" renderChildren={renderBottleForm} />
    <Tab label="Log diaper" renderChildren={renderDiaperForm} />
  </div>
)
