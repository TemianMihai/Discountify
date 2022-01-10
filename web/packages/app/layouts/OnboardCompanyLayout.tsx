import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loader from '@web-technologies/ui/atoms/Loader'

/**
 * Lazy load routes
 */
const SetupCompanyProfilePage = lazy(
  () => import('../pages/SetupCompanyProfilePage'),
)

const OnboardCompanyLayout: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/onboard-company">
        <Redirect to="/onboard-user/profile/:step" />
      </Route>
      <Route exact path="/onboard-company/profile/:step">
        <Suspense fallback={<Loader />}>
          <SetupCompanyProfilePage />
        </Suspense>
      </Route>
    </Switch>
  )
}

export default OnboardCompanyLayout
