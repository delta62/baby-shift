import { History } from '@components'
import { Form, FormItem } from '@delta62/micro-form'
import { useUpdateLogMutation } from '@clients'
import { useCallback, useRef } from 'react'
import { timestampToFormTime } from '../format'
import styles from './time-form.module.scss'

export interface Props {
  item: History
}

const CLASS_NAMES = {
  form: styles.form,
  field: styles.formField,
  item: styles.formItem,
}

export let TimeForm = ({ item }: Props) => {
  let [update] = useUpdateLogMutation()
  let upRef = useRef<HTMLInputElement>(null)
  let downRef = useRef<HTMLInputElement>(null)

  let onSubmit = useCallback(() => {
    let upTime = upRef.current ? new Date(upRef.current.value).getTime() : 0
    let downTime = downRef.current
      ? new Date(downRef.current.value).getTime()
      : 0

    let newItem: Partial<History> = {
      id: item.id,
    }

    if (upTime) newItem.up = upTime
    if (downTime) newItem.down = downTime

    update(newItem)
  }, [item, update])

  return (
    <Form onSubmit={onSubmit} classNames={CLASS_NAMES}>
      <FormItem
        ref={upRef}
        type={'datetime-local' as any}
        name="up"
        label=""
        showErrors={false}
        defaultValue={timestampToFormTime(item.up)}
      />
      {item.down && (
        <>
          <span className={styles.to}>to</span>
          <FormItem
            ref={downRef}
            type={'datetime-local' as any}
            name="down"
            label=""
            showErrors={false}
            defaultValue={timestampToFormTime(item.down)}
          />
        </>
      )}
      <FormItem type="submit" label="✔" />
    </Form>
  )
}
