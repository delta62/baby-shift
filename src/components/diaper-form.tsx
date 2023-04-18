import { Form, FormItem } from '@delta62/micro-form'
import { useCallback, useRef } from 'react'
import { useGetHistoryState, useUpdateLogMutation } from '@clients'
import { getHistoryLog } from '@store'
import styles from './diaper-form.module.scss'

interface Props {
  id: string
  onSubmit?(): void
}

const CLASS_NAMES = {
  form: styles.form,
  field: styles.formField,
  item: styles.formItem,
}

export let DiaperForm = (props: Props) => {
  let [update] = useUpdateLogMutation()
  let { data } = useGetHistoryState(undefined)
  let item = getHistoryLog(data ?? [], props.id)
  let pooRef = useRef<HTMLInputElement>(null)
  let peeRef = useRef<HTMLInputElement>(null)

  let onSubmit = useCallback(
    (fields: Record<string, string>) => {
      let diaper = parseInt(fields.diaper, 10) || 0
      if (!item || diaper <= 0) return

      let oldDiapers = item.diapers ?? []
      let diapers = [...oldDiapers, diaper]
      let { id } = item

      update({ id, diapers })
      pooRef.current!.checked = false
      peeRef.current!.checked = false
      props.onSubmit?.()
    },
    [item, update]
  )

  return (
    <Form onSubmit={onSubmit} classNames={CLASS_NAMES}>
      <FormItem
        ref={peeRef}
        type="radio"
        name="diaper"
        label="💦"
        value="1"
        showErrors={false}
      />
      <FormItem
        ref={pooRef}
        type="radio"
        name="diaper"
        value="2"
        label="💩"
        showErrors={false}
      />
      <FormItem type="submit" label="✔" />
    </Form>
  )
}
