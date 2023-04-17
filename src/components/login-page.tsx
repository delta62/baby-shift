import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, useRedirect } from '@delta62/micro-router'
import { Dispatch, getIsLoggedIn, login } from '@store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './login-page.module.scss'

interface FormFields {
  email: string
  password: string
}

export let LoginPage = () => {
  let dispatch = useDispatch<Dispatch>()
  let isLoggedIn = useSelector(getIsLoggedIn)

  useRedirect({ to: '/', when: !!isLoggedIn })

  let onSubmit = useCallback(
    (fields: unknown) => {
      dispatch(login(fields as FormFields))
    },
    [dispatch]
  )

  return (
    <div className={styles.loginPage}>
      <h1>Log in</h1>
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
          autoComplete="current-password"
        />
        <FormItem type="submit" label="Log in" />
      </Form>
      <Anchor href="/signup">Sign up</Anchor>
    </div>
  )
}
