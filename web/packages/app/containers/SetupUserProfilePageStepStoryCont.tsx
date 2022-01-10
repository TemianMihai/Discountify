import React, { useEffect } from 'react'
import { Grid, FormControl, Input, InputLabel } from '@material-ui/core'
import * as yup from 'yup'
import { UserModel } from '@web-technologies/shared/types/graphql'
import { useSetupProfile } from '@web-technologies/shared/hooks/user'
import SetupUserProfilePageNav from '../components/SetupUserProfilePageNav'

/**
 * Types
 */
interface Props {
  me?: UserModel
  onAfterMount: (name: string) => void
}

/**
 * Schema
 */
const schema = yup.object().shape({
  story: yup.string().required(),
})

const SetupUserProfilePageStepStoryCont: React.FC<Props> = ({
  me,
  onAfterMount,
}: Props) => {
  const { update, register, disabled } = useSetupProfile({
    schema,
    defaultValues: {
      story: me?.story,
    },
  })

  useEffect(() => {
    onAfterMount('story')
  }, [])

  return (
    <>
      <Grid item>
        <FormControl>
          <InputLabel>Story</InputLabel>
          <Input name="story" type="text" inputRef={register} />
        </FormControl>
      </Grid>

      <SetupUserProfilePageNav disabled={disabled} onBeforeNext={update} />
    </>
  )
}

export default SetupUserProfilePageStepStoryCont
