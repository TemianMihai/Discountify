import React, { useState } from 'react'
import { not } from 'ramda'
import { Redirect, useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'

import { useMe } from '@web-technologies/shared/hooks/user'
import Loader from '@web-technologies/ui/atoms/Loader'

import SetupCompanyProfilePageStepStoryCont from '../containers/SetupCompanyProfilePageStepStoryCont'
import SetupCompanyProfilePageStepInterestsCont from '../containers/SetupCompanyProfilePageStepStoryCont'
import SetupCompanyProfilePageStepProfilePhotoCont from '../containers/SetupCompanyProfilePageStepProfilePhotoCont'
import SetupCompanyProfilePageStepThumbnailPhotoCont from '../containers/SetupCompanyProfilePageStepThumbnailPhotoCont'

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
    <SetupCompanyProfilePageStepStoryCont
      me={me}
      onAfterMount={setAreStepsMounted}
    />,
    <SetupCompanyProfilePageStepInterestsCont
      me={me}
      onAfterMount={setAreStepsMounted}
    />,
    <SetupCompanyProfilePageStepThumbnailPhotoCont
      me={me}
      onAfterMount={setAreStepsMounted}
    />,
    <SetupCompanyProfilePageStepProfilePhotoCont
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
