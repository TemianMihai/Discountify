import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Box } from '@material-ui/core'

import { useAuth } from '@web-technologies/shared/hooks/user'
import Loader from '@web-technologies/ui/atoms/Loader'

/**
 * Lazy load routes
 */
const LoginPage = lazy(() => import('../pages/LoginPage'))
const SignUpCompany = lazy(() => import('../pages/SignUpCompany'))
const SignUpUser = lazy(() => import('../pages/SignUpUser'))

const AuthLayout: React.FC = () => {
  const auth = useAuth()

  if (auth.authenticated()) {
    return <Redirect to="/home" />
  }

  return (
    <Box>
      <Switch>
        <Route exact path="/auth">
          <Redirect to="/auth/login" />
        </Route>
        <Route exact path="/auth/login">
          <Suspense fallback={<Loader />}>
            <LoginPage />
          </Suspense>
        </Route>
        <Route exact path="/auth/sign-up/user">
          <Suspense fallback={<Loader />}>
            <SignUpUser />
          </Suspense>
        </Route>
        <Route exact path="/auth/sign-up/company">
          <Suspense fallback={<Loader />}>
            <SignUpCompany />
          </Suspense>
        </Route>
      </Switch>
    </Box>
  )
}

export default AuthLayout
