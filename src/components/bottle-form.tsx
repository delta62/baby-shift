import { Form, FormItem } from '@delta62/micro-form'
import { useCallback, useRef } from 'react'
import { useGetHistoryState, useUpdateLogMutation } from '@clients'
import { getHistoryLog } from '@store'
import styles from './bottle-form.module.scss'

interface Props {
  id: string
  onSubmit?(): void
}

const CLASS_NAMES = {
  form: styles.form,
  field: styles.formField,
  item: styles.formItem,
}

export let BottleForm = (props: Props) => {
  let [update] = useUpdateLogMutation()
  let { data } = useGetHistoryState(undefined)
  let item = getHistoryLog(data ?? [], props.id)
  let inputRef = useRef<HTMLInputElement>(null)

  let onSubmit = useCallback(
    (fields: Record<string, string>) => {
      let bottle = parseFloat(fields.bottle) || 0
      if (!item || bottle <= 0) return

      let oldBottles = item.bottles ?? []
      let bottles = [...oldBottles, bottle]

      update({ id: item.id, bottles })
      inputRef.current!.value = ''
      props.onSubmit?.()
    },
    [item, update]
  )

  return (
    <Form onSubmit={onSubmit} classNames={CLASS_NAMES}>
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
