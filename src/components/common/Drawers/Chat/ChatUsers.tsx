import { useCategoryLazyQuery } from "@/generated/graphql"
import { selectedChatRoomId } from "@/lib/apolloClient"
import { useReactiveVar } from "@apollo/client"
import {
  Avatar,
  Box,
  Code,
  List,
  ListItem,
  Skeleton,
  Stack
} from "@chakra-ui/react"
import React, { useEffect } from "react"

export default function ChatUsers() {
  const chatId = useReactiveVar(selectedChatRoomId)
  const [getChatRoomUsers, { data, loading }] = useCategoryLazyQuery({
    ssr: false,
    pollInterval: 500
  })

  useEffect(
    () =>
      getChatRoomUsers({
        variables: { categoryId: Number(chatId) }
      }),
    [getChatRoomUsers, chatId]
  )

  if (data && data.category && data.category.chatUsers) {
    return (
      <Box
        overflowY="auto"
        height="auto"
        w="15%"
        p={3}
        border="2px solid white"
      >
        <Skeleton isLoaded={!loading}>
          <List mt={2} spacing={4}>
            {data.category.chatUsers.map((user: any) => (
              <ListItem key={`chat user ${user.username}`}>
                <Stack h="100%" direction="row">
                  <Avatar
                    size="xs"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                    mr={3}
                  />
                  <Code>{user.username}</Code>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Skeleton>
      </Box>
    )
  }
  return null
}
