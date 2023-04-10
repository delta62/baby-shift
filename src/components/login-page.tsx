import { Form, FormItem } from '@delta62/micro-form'
import { Anchor, Redirect } from '@delta62/micro-router'
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

  let onSubmit = useCallback(
    (fields: FormFields) => {
      dispatch(login(fields))
    },
    [dispatch]
  )

  return (
    <>
      <h1>Log in</h1>
      <Redirect to="/" when={!!isLoggedIn} />
      <Form onSubmit={onSubmit}>
        <FormItem type="email" name="email" label="Email" />
        <FormItem type="password" name="password" label="Password" />
        <FormItem type="submit" label="Log in" />
      </Form>
      <Anchor href="/signup">Sign up</Anchor>
    </>
  )
}
