import { Anchor, useRedirect } from '@delta62/micro-router'
import { Form, FormItem } from '@delta62/micro-form'
import { Dispatch, State, getIsLoggedIn, signup } from '@store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './signup-page.module.scss'

interface FormFields {
  email: string
  password: string
}

export let SignupPage = () => {
  let isLoggedIn = useSelector<State>(getIsLoggedIn)
  let dispatch = useDispatch<Dispatch>()

  useRedirect({ to: '/', when: !!isLoggedIn })

  let onSubmit = useCallback(
    (fields: unknown) => {
      dispatch(signup(fields as FormFields))
    },
    [dispatch]
  )

  return (
    <div className={styles.signupPage}>
      <h1>Sign up</h1>
      <Form
        onSubmit={onSubmit}
        classNames={{
          invalid: styles.invalid,
          touched: styles.touched,
          form: styles.form,
          item: styles.formItem,
          field: styles.formField,
        }}
      >
        <FormItem
          type="email"
          name="email"
          label="Email"
          showErrors={false}
          autoComplete="email"
        />
        <FormItem
          type="password"
          name="password"
          label="Password"
          showErrors={false}
          autoComplete="new-password"
        />
        <FormItem type="submit" label="Sign up" />
      </Form>
      <Anchor href="/login">Log in</Anchor>
    </div>
  )
}
