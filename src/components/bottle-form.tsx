import { Form, FormItem } from '@delta62/micro-form'
import { useCallback } from 'react'
import { useGetHistoryState, useUpdateLogMutation } from '@clients'
import styles from './bottle-form.module.scss'
import { getMostRecentLog } from '@store'

export let BottleForm = () => {
  let [update] = useUpdateLogMutation()
  let { data } = useGetHistoryState(undefined)
  let latest = getMostRecentLog(data ?? [])

  let onSubmit = useCallback(
    (fields: Record<string, string>) => {
      let bottle = parseInt(fields.bottle, 10) || 0
      if (!latest || bottle <= 0) return

      let oldBottles = latest.bottles ?? []
      let bottles = [...oldBottles, bottle]
      let { id } = latest

      update({ id, bottles })
    },
    [latest, update]
  )

  return (
    <Form
      onSubmit={onSubmit}
      classNames={{
        form: styles.form,
        field: styles.formField,
        item: styles.formItem,
      }}
    >
      <FormItem
        type="number"
        name="bottle"
        label="🍼"
        suffix="oz"
        showErrors={false}
      />
      <FormItem type="submit" label="log" />
    </Form>
  )
}
