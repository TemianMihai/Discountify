import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Loader from '@web-technologies/ui/atoms/Loader'

/**
 * Lazy load routes
 */
const HomePage = lazy(() => import('../pages/HomePage'))
const LogoutPage = lazy(() => import('../pages/LogoutPage'))

const AuthLayout = lazy(() => import('../layouts/AuthLayout'))
const OnboardCompanyLayout = lazy(
  () => import('../layouts/OnboardCompanyLayout'),
)
const OnboardUserLayout = lazy(() => import('../layouts/OnboardUserLayout'))

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/logout">
          <Suspense fallback={<Loader />}>
            <LogoutPage />
          </Suspense>
        </Route>
        <Route path="/auth/:pageName">
          <Suspense fallback={<Loader />}>
            <AuthLayout />
          </Suspense>
        </Route>
        <Route path="/onboard-company/:pageName/:subPageName?">
          <Suspense fallback={<Loader />}>
            <OnboardCompanyLayout />
          </Suspense>
        </Route>
        <Route path="/onboard-user/:pageName/:subPageName?">
          <Suspense fallback={<Loader />}>
            <OnboardUserLayout />
          </Suspense>
        </Route>
        <Route exact path="/home">
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
