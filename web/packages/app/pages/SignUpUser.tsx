import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'

import { setToken } from '@web-technologies/shared/helpers/utils'

/**
 * Schema
 */
const schema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().email().required(),
})

const SignUpUser: React.FC = () => {
  // const history = useHistory()
  // const { enqueueSnackbar } = useSnackbar()
  //
  // const [login, { error, loading }] = useMutation(LOGIN)
  //
  // const { register, formState, handleSubmit } = useForm<LoginInput>({
  //   mode: 'all',
  //   resolver: yupResolver(schema),
  // })
  //
  // const onSubmit = async (form: LoginInput): Promise<void> => {
  //   if (formState.isValid) {
  //     const variables = {
  //       input: {
  //         email: form.email,
  //         password: form.password,
  //       },
  //     }
  //
  //     try {
  //       const { data } = await login({ variables })
  //       setToken(data?.login?.accessToken)
  //       history.push('/home')
  //     } catch (error) {
  //       enqueueSnackbar(error.message, { variant: 'error' })
  //     }
  //   }
  // }

  return <>SIGNUPUSERPAGE</>
}

export default SignUpUser
