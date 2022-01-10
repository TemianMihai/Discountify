import React, { useState } from 'react'
import { not } from 'ramda'
import { Redirect, useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'

import { useMe } from '@web-technologies/shared/hooks/user'
import Loader from '@web-technologies/ui/atoms/Loader'

import SetupUserProfilePageStepStoryCont from '../containers/SetupUserProfilePageStepStoryCont'
import SetupUserProfilePageStepInterestsCont from '../containers/SetupUserProfilePageStepInterestsCont'
import SetupUserProfilePageStepPhotoCont from '../containers/SetupUserProfilePageStepPhotoCont'

/**
 * Constants
 */
const NEXT_STEP_OFFSET = 1

const SetupProfilePage: React.FC = () => {
  const [areStepsMounted, setAreStepsMounted] = useState<string | undefined>()

  const { me, loading } = useMe()

  const questions = ["What's your name", "What's your location"]
  const descriptions = ['Update location', 'Blabla']

  const params = useParams<Record<string, string>>()
  const current = parseInt(params?.step)
  const step = current - NEXT_STEP_OFFSET

  if (loading) {
    return <Loader />
  }
  if (me?.isComplete && not(areStepsMounted)) {
    return <Redirect to="/home" />
  }

  const steps = [
    <SetupUserProfilePageStepStoryCont
      me={me}
      onAfterMount={setAreStepsMounted}
    />,
    <SetupUserProfilePageStepInterestsCont
      me={me}
      onAfterMount={setAreStepsMounted}
    />,
    <SetupUserProfilePageStepPhotoCont
      me={me}
      onAfterMount={setAreStepsMounted}
    />,
  ]

  return (
    <>
      <Typography variant="h1">{questions[step]}</Typography>

      <Box>
        <Typography variant="h6">{descriptions[step]}</Typography>
      </Box>

      <Box>{steps[step]}</Box>
    </>
  )
}

export default SetupProfilePage
