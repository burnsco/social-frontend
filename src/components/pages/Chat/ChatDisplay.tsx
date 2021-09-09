import {
  CategoryChatSubDocument,
  useChatRoomMessagesQuery
} from "@/generated/graphql"
import { selectedChatRoomId } from "@/lib/apolloClient"
import { useReactiveVar } from "@apollo/client"
import { Alert } from "@chakra-ui/react"
import React from "react"
import ChatList from "./ChatList"

export default function ChatDisplay() {
  const selectedCategoryId = useReactiveVar(selectedChatRoomId)

  const { subscribeToMore, ...result } = useChatRoomMessagesQuery({
    variables: { categoryId: selectedCategoryId }
  })

  if (subscribeToMore !== undefined) {
    return (
      <ChatList
        {...result}
        handleSubscription={() =>
          subscribeToMore({
            document: CategoryChatSubDocument,
            variables: { categoryId: selectedCategoryId },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev
              const newFeedItem = subscriptionData.data.newMessage
              return {
                ...prev,
                messages: [newFeedItem, { ...prev.messages }]
              }
            }
          })
        }
      />
    )
  }
  return <Alert>No Chat Yet</Alert>
}
