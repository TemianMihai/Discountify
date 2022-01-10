import React from 'react'
import { GraphQLError } from 'graphql'
import decode, { JwtPayload } from 'jwt-decode'
import { fromUnixTime, isFuture } from 'date-fns/esm'
import { isNil, mergeRight } from 'ramda'
import { StatusCodes } from 'http-status-codes'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { onError, ErrorResponse } from '@apollo/link-error'
import { setContext } from '@apollo/client/link/context'
import {
  getToken,
  refreshToken,
  removeToken,
  setToken,
} from '@web-technologies/shared/helpers/utils'

/**
 * Types
 */
interface Props {
  children: JSX.Element[] | JSX.Element
}

/**
 * Helpers
 */
const logout = (): void => {
  removeToken()
  window.location.reload()
}

export const isTokenSetAndValid = (): boolean => {
  const token = getToken()

  if (isNil(token)) {
    return isNil(token)
  }

  const decoded = decode<JwtPayload>(token)
  const expiration = fromUnixTime(decoded.exp as number)

  return isFuture(expiration)
}

/**
 * Links
 */
const refresh = new TokenRefreshLink({
  isTokenValidOrUndefined: isTokenSetAndValid,
  fetchAccessToken: refreshToken,
  handleError: logout,
  handleFetch: setToken,
  handleResponse: (_: unknown, key: string) => (token: string) => ({
    [key]: token,
  }),
})

const http = new HttpLink({
  credentials: 'include',
  uri: process.env.API_URL,
})

const error = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error: GraphQLError) => {
      if (
        error?.extensions?.exception?.response?.statusCode ===
        StatusCodes.UNAUTHORIZED
      ) {
        logout()
      }
      console.warn(error)
    })
  }
  if (networkError) {
    console.error(networkError)
  }
})

const auth = setContext((_, { headers }) => {
  const token = getToken()

  if (token) {
    return {
      headers: mergeRight(headers, {
        authorization: `Bearer ${token}`,
      }),
    }
  }

  return {
    headers,
  }
})

/**
 * Client
 */
const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development',
  link: ApolloLink.from([error, refresh as any, auth.concat(http)]),
})

const Apollo: React.FC<Props> = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Apollo
