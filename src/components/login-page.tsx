import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, useRedirect } from '@delta62/micro-router'
import { Dispatch, getIsLoggedIn, login } from '@store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
    <>
      <h1>Log in</h1>
      <Form onSubmit={onSubmit}>
        <FormItem
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
        />
        <FormItem
          type="password"
          name="password"
          label="Password"
          autoComplete="current-password"
        />
        <FormItem type="submit" label="Log in" />
      </Form>
      <Anchor href="/signup">Sign up</Anchor>
    </>
  )
}
