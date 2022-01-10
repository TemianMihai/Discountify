import React, { useEffect } from 'react'
import { Grid, FormControl, Input, InputLabel } from '@material-ui/core'
import * as yup from 'yup'
import { useSetupProfileCompany } from '@web-technologies/shared/hooks/company'

import SetupCompanyProfilePageNav from '../components/SetupCompanyProfilePageNav'
import { CompanyModel } from '@web-technologies/shared/types/graphql'

/**
 * Types
 */
interface Props {
  me?: CompanyModel
  onAfterMount: (name: string) => void
}

/**
 * Schema
 */
const schema = yup.object().shape({
  story: yup.string().required(),
})

const SetupCompanyProfilePageStepStoryCont: React.FC<Props> = ({
  me,
  onAfterMount,
}: Props) => {
  const { update, register, disabled } = useSetupProfileCompany({
    schema,
    defaultValues: {
      story: me?.description,
    },
  })

  useEffect(() => {
    onAfterMount('description')
  }, [])

  return (
    <>
      <Grid item>
        <FormControl>
          <InputLabel>Story</InputLabel>
          <Input name="story" type="text" inputRef={register} />
        </FormControl>
      </Grid>

      <SetupCompanyProfilePageNav disabled={disabled} onBeforeNext={update} />
    </>
  )
}

export default SetupCompanyProfilePageStepStoryCont
