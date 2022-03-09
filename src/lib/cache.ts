import { InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { selectedChatRoomId, selectedChatRoomName } from './apolloClient'

export const cacheOptions = new InMemoryCache({
  typePolicies: {
    Post: {
      fields: {
        createdAt: {
          read(createdAt) {
            return Number(createdAt)
          },
        },
        updatedAt: {
          read(updatedAt) {
            return Number(updatedAt)
          },
        },
      },
    },
    Message: {
      fields: {
        createdAt: {
          read(createdAt) {
            return Number(createdAt)
          },
        },
        updatedAt: {
          read(updatedAt) {
            return Number(updatedAt)
          },
        },
      },
    },
    Comment: {
      fields: {
        createdAt: {
          read(createdAt) {
            return Number(createdAt)
          },
        },
        updatedAt: {
          read(updatedAt) {
            return Number(updatedAt)
          },
        },
      },
    },
    Query: {
      fields: {
        posts: concatPagination(),
        selectedChatRoomId: {
          read() {
            return selectedChatRoomId()
          },
        },
        selecteChatRoomName: {
          read() {
            return selectedChatRoomName()
          },
        },
      },
    },
  },
})
