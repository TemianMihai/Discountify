import axios from 'axios'
import { Interest } from '../types/graphql'

const ACCESS_TOKEN = 'project-access-token'

export const noop = (): void => {}

export const setToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN, token)
}

export const removeToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN)
}

export const getToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN)
}

export const isTokenSet = (token: string | null): boolean => {
  if (token) {
    return token !== 'undefined'
  }
  return token !== null
}
export const refreshToken = async (): Promise<Response> => {
  const { data } = await axios({
    method: 'POST',
    withCredentials: true,
    url: process.env.API_URL,
    data: { query: 'mutation { refreshToken { accessToken } }' },
  })

  return data?.data?.refreshToken?.accessToken
}

export const translateInterest = (interest: Interest) => {
  return {
    id: interest,
    title: interestTranslated,
  }
}

export const upload = async (
  url: string,
  file: File,
): Promise<AxiosResponse<any>> => {
  return await axios(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      'Content-type': 'application/octet-stream',
    },
    data: file,
  })
}

export const staticFileUrl = (
  fileUrl: string | null | undefined,
): string | undefined => {
  if (fileUrl?.startsWith('http')) {
    return fileUrl
  }
  if (fileUrl && process.env.STATIC_URL) {
    return `${process.env.STATIC_URL}/${fileUrl}`
  }
  return undefined
}
