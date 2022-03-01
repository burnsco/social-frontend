import { InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'
import { selectedChatRoomId, selectedChatRoomName } from './apolloClient'

export const cacheOptions = new InMemoryCache({
  typePolicies: {
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
    Post: {
      merge: true,
    },
  },
})
