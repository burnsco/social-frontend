import { InMemoryCache } from "@apollo/client"
import { concatPagination } from "@apollo/client/utilities"
import { Category } from "../generated/graphql"
import { selectedChatRoomId, selectedChatRoomName } from "./apolloClient"

export const cacheOptions = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        categories: {
          keyArgs: [],
          merge(
            existing: Category[] | undefined,
            incoming: Category[]
          ): Category[] {
            return existing ? [...incoming, ...existing] : [...incoming]
          }
        },

        posts: concatPagination(),
        selectedChatRoomId: {
          read() {
            return selectedChatRoomId()
          }
        },
        selecteChatRoomName: {
          read() {
            return selectedChatRoomName()
          }
        }
      }
    },
    Post: {
      merge: true
    }
  }
})
