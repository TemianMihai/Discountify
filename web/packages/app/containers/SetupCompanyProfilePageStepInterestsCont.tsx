import React, { memo, useEffect, useMemo } from 'react'
import { values } from 'ramda'
import { FormControl } from '@material-ui/core'
import { Controller, ControllerRenderProps } from 'react-hook-form'
import * as yup from 'yup'

import Autocomplete from '@web-technologies/ui/molecules/Autocomplete'

import { translateInterest } from '@web-technologies/shared/helpers/utils'

import { useSetupProfileCompany } from '@web-technologies/shared/hooks/company'
import SetupCompanyProfilePageNav from '../components/SetupCompanyProfilePageNav'
import { CompanyModel, Interest } from '@web-technologies/shared/types/graphql'

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
  interests: yup
    .array(
      yup.object().shape({
        id: yup.string(),
        title: yup.string(),
      }),
    )
    .required(),
})

const SetupCompanyProfilePageStepInterestsCont: React.FC<Props> = ({
  me,
  onAfterMount,
}: Props) => {
  const { update, disabled, control } = useSetupProfileCompany({
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

      <SetupCompanyProfilePageNav disabled={disabled} onBeforeNext={update} />
    </>
  )
}

export default memo(SetupCompanyProfilePageStepInterestsCont)
