import React from 'react'
import { Button, Grid } from '@material-ui/core'

import { noop } from 'lodash'
import { useParams, useHistory } from 'react-router-dom'

/**
 * Types
 */
interface Props {
  disabled?: boolean
  onBeforeNext?: (...args: any[]) => void | Promise<void>
}

/**
 * Constants
 */
const LAST_STEP = 6
const NEXT_STEP_OFFSET = 1

const SetupCompanyProfilePageNav: React.FC<Props> = ({
  disabled,
  onBeforeNext = noop,
}: Props) => {
  const history = useHistory()
  const params = useParams<Record<string, string>>()

  const step = parseInt(params?.step)
  const canSeePrev = step > NEXT_STEP_OFFSET

  const onPrev = (): void => {
    history.push(`/onboard-company/profile/${step - NEXT_STEP_OFFSET}`)
  }

  const onNext = async (): Promise<void> => {
    await onBeforeNext()

    if (step === LAST_STEP) {
      //TODO: REDIRECT
    } else {
      history.push(`/onboard-company/profile/${step + NEXT_STEP_OFFSET}`)
    }
  }

  return (
    <>
      <Grid container>
        {canSeePrev ? (
          <Grid sm="auto" item>
            <Button data-test-id="back-button" variant="text" onClick={onPrev}>
              Back
            </Button>
          </Grid>
        ) : null}

        <Grid sm="auto" item>
          <Button
            variant="contained"
            disabled={disabled}
            data-test-id="next-step-button"
            onClick={onNext}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SetupCompanyProfilePageNav
