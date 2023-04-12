import { Form, FormItem } from '@delta62/micro-form'
import { useCallback, useRef } from 'react'
import { useGetHistoryState, useUpdateLogMutation } from '@clients'
import { getMostRecentLog } from '@store'
import styles from './diaper-form.module.scss'

interface Props {
  onSubmit(): void
}

export let DiaperForm = (props: Props) => {
  let [update] = useUpdateLogMutation()
  let { data } = useGetHistoryState(undefined)
  let latest = getMostRecentLog(data ?? [])
  let pooRef = useRef<HTMLInputElement>(null)
  let peeRef = useRef<HTMLInputElement>(null)

  let onSubmit = useCallback(
    (fields: Record<string, string>) => {
      let diaper = parseInt(fields.diaper, 10) || 0
      if (!latest || diaper <= 0) return

      let oldDiapers = latest.diapers ?? []
      let diapers = [...oldDiapers, diaper]
      let { id } = latest

      update({ id, diapers })
      pooRef.current!.checked = false
      peeRef.current!.checked = false
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
        ref={peeRef}
        type={'radio' as any}
        name="diaper"
        label="💦"
        value="1"
        showErrors={false}
      />
      <FormItem
        ref={pooRef}
        type={'radio' as any}
        name="diaper"
        value="2"
        label="💩"
        showErrors={false}
      />
      <FormItem type="submit" label="✔" />
    </Form>
  )
}
