import { Provider } from 'react-redux'
import { LoginPage, MainPage, SignupPage } from '@components'
import { Route, RouteProvider } from '@delta62/micro-router'
import store from '@store'
import './app.module.scss'

export let App = () => (
  <Provider store={store}>
    <RouteProvider>
      <Route path="/">
        <MainPage />
      </Route>
      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
    </RouteProvider>
  </Provider>
)
