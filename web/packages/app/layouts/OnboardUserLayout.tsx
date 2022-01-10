import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loader from '@web-technologies/ui/atoms/Loader'

/**
 * Lazy load routes
 */
const SetupUserProfilePage = lazy(() => import('../pages/SetupUserProfilePage'))

const OnboardUserLayout: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/onboard-user">
        <Redirect to="/onboard-user/profile/:step" />
      </Route>
      <Route exact path="/onboard-user/profile/:step">
        <Suspense fallback={<Loader />}>
          <SetupUserProfilePage />
        </Suspense>
      </Route>
    </Switch>
  )
}

export default OnboardUserLayout
