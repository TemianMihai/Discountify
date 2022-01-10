import { ReactNode } from 'react'
import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { not } from 'ramda'
import { useForm } from 'react-hook-form'
import { useSetState } from './general'
import { upload } from '../helpers/utils'
import { Interest, UpdateCompanyInput } from '../types/graphql'

interface DefaultUpdateCompanyValues
  extends Omit<UpdateCompanyInput, 'interests'> {
  interests?: Array<{
    id: Interest
    title: ReactNode
  }>
}

export const useSetupProfileCompany = ({
  schema,
  defaultValues,
}: {
  schema: yup.ObjectSchema<any>
  defaultValues: DefaultUpdateCompanyValues
}) => {
  const [updateMeCompany, { loading, error }] = useMutation(UPDATE_ME_COMPANY)

  const { register, control, formState, getValues } = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(schema),
  })

  const disabled = loading || not(formState.isValid)

  const update = async (): Promise<void> => {
    const variables = {
      input: companyProfileInput(getValues()),
    }

    try {
      await updateMeCompany({ variables })
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

export const useUpdateProfilePhotoCompany = (imageUrl: string) => {
  const [ui, setUI] = useSetState({
    loading: false,
  })

  const [updateMeCompany] = useMutation(UPDATE_ME_COMPANY)
  const [generateCompanyUploadUrl] = useMutation(GENERATE_COMPANY_UPLOAD_URL)

  const onDrop = async ([file]: File[]): Promise<void> => {
    const variables = {
      input: {
        filename: file.name,
      },
    }

    try {
      setUI({ loading: true })
      const { data } = await generateCompanyUploadUrl({ variables })
      await upload(data?.generateCompanyUploadUrl?.uploadURL, file)
      if (imageUrl === 'avatarUrl') {
        await updateMeCompany({
          variables: {
            input: { avatarUrl: data?.generateCompanyUploadUrl?.contentURL },
          },
        })
      }
      if (imageUrl === 'thumbnailUrl') {
        await updateMeCompany({
          variables: {
            input: { thumbnailUrl: data?.generateCompanyUploadUrl?.contentURL },
          },
        })
      }
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
