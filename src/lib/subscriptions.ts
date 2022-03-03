import { ApolloError, ApolloLink, FetchResult, Operation } from '@apollo/client'
import { isNonNullObject, Observable } from '@apollo/client/utilities'
import { print } from 'graphql'
import type { Client } from 'graphql-ws'

interface LikeCloseEvent {
  /** Returns the WebSocket connection close code provided by the server. */
  readonly code: number
  /** Returns the WebSocket connection close reason provided by the server. */
  readonly reason: string
}

function isLikeCloseEvent(val: unknown): val is LikeCloseEvent {
  return isNonNullObject(val) && 'code' in val && 'reason' in val
}

export class GraphQLWsLink extends ApolloLink {
  constructor(public readonly client: Client) {
    super()
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((observer) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: observer.next.bind(observer),
          complete: observer.complete.bind(observer),
          error: (err) => {
            if (err instanceof Error) {
              return observer.error(err)
            }

            if (isLikeCloseEvent(err)) {
              return observer.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`
                )
              )
            }

            return observer.error(
              new ApolloError({
                graphQLErrors: Array.isArray(err) ? err : [err],
              })
            )
          },
        }
      )
    })
  }
}
