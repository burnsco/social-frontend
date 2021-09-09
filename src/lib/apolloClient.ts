import {
  ApolloClient,
  HttpLink,
  makeVar,
  NormalizedCacheObject,
  ReactiveVar,
  split
} from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { useMemo } from "react"
import { SubscriptionClient } from "subscriptions-transport-ws"
import { cacheOptions } from "./cache"

export const selectedChatRoomId: ReactiveVar<number> = makeVar<number>(39)
export const selectedChatRoomName: ReactiveVar<string> = makeVar<string>(
  "react-js"
)

let apolloClient: ApolloClient<NormalizedCacheObject>

const WS_URI = `ws://localhost:4000/subscriptions`

function createApolloClient() {
  const ssrMode = typeof window === "undefined"
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL as string,
    credentials: "include"
  })
  if (ssrMode) {
    return new ApolloClient({
      ssrMode,
      link: httpLink,
      cache: cacheOptions
    })
  }
  const client = new SubscriptionClient(WS_URI, {
    reconnect: true
  })
  const wsLink = new WebSocketLink(client)
  const link = process.browser
    ? split(
        ({ query }) => {
          const operations = getMainDefinition(query)
          return (
            operations.kind === "OperationDefinition" &&
            operations.operation === "subscription"
          )
        },
        wsLink,
        httpLink
      )
    : httpLink
  return new ApolloClient({
    ssrMode,
    link,
    cache: cacheOptions
  })
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  if (typeof window === "undefined") return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
