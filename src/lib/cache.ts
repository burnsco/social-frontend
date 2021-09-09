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
        post(_, { args, toReference }) {
          return toReference({
            __typename: "Post",
            id: args?.postId
          })
        },
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
      fields: {
        category: {
          merge(existing, incoming) {
            return { ...existing, ...incoming }
          }
        },
        totalVotes: {
          merge(existing, incoming) {
            return { ...existing, ...incoming }
          }
        }
      }
    },
    Category: {
      fields: {
        messages: {
          merge(existing, incoming) {
            return [...existing, ...incoming]
          }
        }
      }
    }
  }
})
