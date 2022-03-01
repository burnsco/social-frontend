import {
  ApolloClient,
  HttpLink,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { merge } from 'lodash'
import isEqual from 'lodash/isEqual'
import { useMemo } from 'react'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { cacheOptions } from './cache'

export const selectedChatRoomId: ReactiveVar<number> = makeVar<number>(39)
export const selectedChatRoomName: ReactiveVar<string> =
  makeVar<string>('react-js')

let apolloClient: ApolloClient<NormalizedCacheObject>

const WS_URI = `ws://localhost:4000/subscriptions`

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

function createApolloClient() {
  const ssrMode = typeof window === 'undefined'
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
  const client = new SubscriptionClient(WS_URI, {
    reconnect: true,
  })
  const wsLink = new WebSocketLink(client)
  const link = process.browser
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
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any, sourceArray: any) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client: any, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
