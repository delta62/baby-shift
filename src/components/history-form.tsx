import { BottleForm, DiaperForm, Tab, TabApi } from '@components'
import styles from './history-form.module.scss'

let renderBottleForm =
  (id: string) =>
  ({ deselect }: TabApi) =>
    <BottleForm id={id} onSubmit={deselect} />

let renderDiaperForm =
  (id: string) =>
  ({ deselect }: TabApi) =>
    <DiaperForm id={id} onSubmit={deselect} />

export interface Props {
  id: string
}

export let HistoryForm = ({ id }: Props) => (
  <div className={styles.verticalTabs}>
    <Tab label="Log bottle" renderChildren={renderBottleForm(id)} />
    <Tab label="Log diaper" renderChildren={renderDiaperForm(id)} />
  </div>
)
