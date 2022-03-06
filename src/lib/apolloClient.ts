import { GraphQLWsLink } from '@/lib/subscriptions'
import {
  ApolloClient,
  HttpLink,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { useMemo } from 'react'
import { cacheOptions } from './cache'

export const selectedChatRoomId: ReactiveVar<string> = makeVar<string>('react')
export const loggedInUserId: ReactiveVar<string> = makeVar<string>('5')
export const selectedChatRoomName: ReactiveVar<string> =
  makeVar<string>('react-js')

let apolloClient: ApolloClient<NormalizedCacheObject>
const WS_URI = `ws://localhost:4000/subscriptions`
const ssrMode = typeof window === 'undefined'

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: 'include',
  })

  if (ssrMode) {
    return new ApolloClient({
      ssrMode,
      link: httpLink,
      cache: cacheOptions,
    })
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: `${WS_URI}`,
      connectionParams: {
        Authorization: 'adsfsdf443',
      },
    })
  )

  const link = typeof window
    ? split(
        ({ query }) => {
          const operations = getMainDefinition(query)
          return (
            operations.kind === 'OperationDefinition' &&
            operations.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink

  return new ApolloClient({
    ssrMode,
    link,
    cache: cacheOptions,
  })
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  if (ssrMode) return _apolloClient

  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
