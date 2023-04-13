import { Anchor, useRedirect } from '@delta62/micro-router'
import { Form, FormItem } from '@delta62/micro-form'
import { Dispatch, State, getIsLoggedIn, signup } from '@store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
    <>
      <h1>Sign up</h1>
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
          autoComplete="new-password"
        />
        <FormItem type="submit" label="Sign up" />
      </Form>
      <Anchor href="/login">Log in</Anchor>
    </>
  )
}
