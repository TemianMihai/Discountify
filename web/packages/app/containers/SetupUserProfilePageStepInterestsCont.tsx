import React, { memo, useEffect, useMemo } from 'react'
import { values } from 'ramda'
import { FormControl } from '@material-ui/core'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import * as yup from 'yup'

import Autocomplete from '@web-technologies/ui/molecules/Autocomplete'

import { useSetupProfile } from '@web-technologies/shared/hooks/user'
import { Interest, UserModel } from '@web-technologies/shared/types/graphql'
import { translateInterest } from '@web-technologies/shared/helpers/utils'

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
  interests: yup
    .array(
      yup.object().shape({
        id: yup.string(),
        title: yup.string(),
      }),
    )
    .required(),
})

const SetupUserProfilePageStepInterestsCont: React.FC<Props> = ({
  me,
  onAfterMount,
}: Props) => {
  const { update, disabled, control } = useSetupProfile({
    schema,
    defaultValues: {
      interests: me?.interests?.map((interest) => translateInterest(interest)),
    },
  })

  const options = useMemo(() => {
    return values(Interest).map((interest) => translateInterest(interest))
  }, [])

  const renderers = {
    interests: ({ value, onChange }: ControllerRenderProps) => {
      return (
        <Autocomplete
          multiple
          options={options}
          value={value ?? []}
          data-test-id="interests"
          placeholder="Interests"
          onChange={(_, option) => onChange(option)}
        />
      )
    },
  }

  useEffect(() => {
    onAfterMount('interests')
  }, [])

  return (
    <>
      <FormControl>
        <Controller
          name="interests"
          control={control}
          render={renderers.interests}
        />
      </FormControl>

      <SetupUserProfilePageNav disabled={disabled} onBeforeNext={update} />
    </>
  )
}

export default memo(SetupUserProfilePageStepInterestsCont)
