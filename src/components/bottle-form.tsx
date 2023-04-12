import { Form, FormItem } from '@delta62/micro-form'
import { useCallback, useRef } from 'react'
import { useGetHistoryState, useUpdateLogMutation } from '@clients'
import { getMostRecentLog } from '@store'
import styles from './bottle-form.module.scss'

interface Props {
  onSubmit(): void
}

export let BottleForm = (props: Props) => {
  let [update] = useUpdateLogMutation()
  let { data } = useGetHistoryState(undefined)
  let latest = getMostRecentLog(data ?? [])
  let inputRef = useRef<HTMLInputElement>(null)

  let onSubmit = useCallback(
    (fields: Record<string, string>) => {
      let bottle = parseFloat(fields.bottle) || 0
      if (!latest || bottle <= 0) return

      let oldBottles = latest.bottles ?? []
      let bottles = [...oldBottles, bottle]
      let { id } = latest

      update({ id, bottles })
      inputRef.current!.value = ''
      props.onSubmit()
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
        ref={inputRef}
        type="number"
        name="bottle"
        label="🍼"
        suffix="oz"
        showErrors={false}
        min={0}
        max={10}
        step="any"
        inputMode="decimal"
      />
      <FormItem type="submit" label="✔" />
    </Form>
  )
}
