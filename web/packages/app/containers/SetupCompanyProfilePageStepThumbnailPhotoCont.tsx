import React, { useEffect } from 'react'
import { isNil } from 'ramda'

import SetupUserProfilePageUploadPhoto from '../components/SetupUserProfilePageUploadPhoto'
import { useUpdateProfilePhotoCompany } from '@web-technologies/shared/hooks/company'
import SetupCompanyProfilePageNav from '../components/SetupCompanyProfilePageNav'
import { CompanyModel } from '@web-technologies/shared/types/graphql'

/**
 * Types
 */
interface Props {
  me?: CompanyModel
  onAfterMount: (name: string) => void
}

const SetupCompanyProfilePageStepThumbnailPhotoCont: React.FC<Props> = ({
  me,
  onAfterMount,
}: Props) => {
  const { loading, onDrop } = useUpdateProfilePhotoCompany('thumbnailUrl')

  useEffect(() => {
    onAfterMount('photo')
  }, [])

  return (
    <>
      <SetupUserProfilePageUploadPhoto
        avatarUrl={me?.thumbnailUrl}
        loading={loading}
        onDrop={onDrop}
      />
      <SetupCompanyProfilePageNav
        disabled={loading || isNil(me?.thumbnailUrl)}
      />
    </>
  )
}

export default SetupCompanyProfilePageStepThumbnailPhotoCont
