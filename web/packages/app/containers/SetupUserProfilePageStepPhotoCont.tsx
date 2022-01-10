import React, { useEffect } from 'react'
import { isNil } from 'ramda'

import { UserModel } from '@web-technologies/shared/types/graphql'
import { useUpdateProfilePhoto } from '@web-technologies/shared/hooks/user'

import SetupUserProfilePageNav from '../components/SetupUserProfilePageNav'
import SetupUserProfilePageUploadPhoto from '../components/SetupUserProfilePageUploadPhoto'

/**
 * Types
 */
interface Props {
  me?: UserModel
  onAfterMount: (name: string) => void
}

const SetupUserProfilePageStepPhotoCont: React.FC<Props> = ({
  me,
  onAfterMount,
}: Props) => {
  const { loading, onDrop } = useUpdateProfilePhoto()

  useEffect(() => {
    onAfterMount('photo')
  }, [])

  return (
    <>
      <SetupUserProfilePageUploadPhoto
        avatarUrl={me?.avatarUrl}
        loading={loading}
        onDrop={onDrop}
      />
      <SetupUserProfilePageNav disabled={loading || isNil(me?.avatarUrl)} />
    </>
  )
}

export default SetupUserProfilePageStepPhotoCont
