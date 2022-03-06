import { Message, useMeQuery } from '@/generated/graphql'
import {
  Avatar,
  Box,
  Code,
  Divider,
  List,
  ListItem,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'

export default function ChatList(props: any) {
  const { handleSubscription } = props
  const { data, loading } = props

  console.log('handleSubscription')
  console.log(handleSubscription)
  console.log(`data loading`)
  console.log(data)

  React.useEffect(() => {
    handleSubscription()
  })

  const { data: meData } = useMeQuery()

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [data])

  if (!loading && data && data.messages) {
    return (
      <Box overflowY="auto" height="auto" w="85%" bg="gray.800" p={2}>
        <List mt={2} spacing={4}>
          {data.messages.map((message: Message) => {
            const myMessage = message.sentBy.username === meData?.me?.username

            return (
              <ListItem
                borderRadius="lg"
                bg={myMessage ? 'gray.700' : 'translucent'}
                key={message.id}
              >
                <Stack h="100%" direction="row">
                  <Avatar
                    size="xs"
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                    mr={3}
                  />
                  <Code>{message.sentBy.username}</Code>
                  <Divider orientation="vertical" colorScheme="orange" />
                  <Text>{message.content}</Text>
                  <Spacer />
                  <Box>{new Date(message.createdAt).toLocaleTimeString()}</Box>
                </Stack>
              </ListItem>
            )
          })}

          <div ref={messagesEndRef} />
        </List>
      </Box>
    )
  }
  return <>No messages yet</>
}
