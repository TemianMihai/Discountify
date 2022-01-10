import { useHistory } from 'react-router'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { getToken, isTokenSet, removeToken, upload } from '../helpers/utils'
import { ME } from '@web-technologies/gql/queries/user'
import { not } from 'ramda'
import { ReactNode } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'

import { useSetState } from './general'
import { Interest, UpdateUserInput } from '../types/graphql'

interface DefaultUpdateUserValues extends Omit<UpdateUserInput, 'interests'> {
  interests?: Array<{
    id: Interest
    title: ReactNode
  }>
}

export const useAuth = () => {
  const { push } = useHistory()
  const { resetStore } = useApolloClient()

  const authenticated = (): boolean => {
    return isTokenSet(getToken())
  }

  const logout = (): void => {
    resetStore()
    removeToken()
    push('/auth/login')
  }

  return {
    logout,
    authenticated,
  } as const
}

export const useMe = () => {
  const { data, error, loading } = useQuery(ME)

  return {
    error,
    loading,
    me: data?.me,
  } as const
}

export const useSetupProfile = ({
  schema,
  defaultValues,
}: {
  schema: yup.ObjectSchema<any>
  defaultValues: DefaultUpdateUserValues
}) => {
  const [updateMeUser, { loading, error }] = useMutation(UPDATE_ME_USER)

  const { register, control, formState, getValues } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema),
  })

  const disabled = loading || not(formState.isValid)

  const update = async (): Promise<void> => {
    const variables = {
      input: userProfileInput(getValues()),
    }

    try {
      await updateMeUser({ variables })
    } catch (error) {}
  }

  return {
    loading,
    disabled,
    register,
    error,
    control,
    update,
  } as const
}

export const useUpdateProfilePhoto = () => {
  const [ui, setUI] = useSetState({
    loading: false,
  })

  const [updateMe] = useMutation(UPDATE_ME)
  const [generateUserUploadUrl] = useMutation(GENERATE_USER_UPLOAD_URL)

  const onDrop = async ([file]: File[]): Promise<void> => {
    const variables = {
      input: {
        filename: file.name,
      },
    }

    try {
      setUI({ loading: true })
      const { data } = await generateUserUploadUrl({ variables })
      await upload(data?.generateUserUploadUrl?.uploadURL, file)
      await updateMe({
        variables: {
          input: { avatarUrl: data?.generateUserUploadUrl?.contentURL },
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setUI({ loading: false })
    }
  }

  return {
    loading: ui.loading,
    onDrop,
  } as const
}
