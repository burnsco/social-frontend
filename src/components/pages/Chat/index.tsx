import { Flex, useColorModeValue } from "@chakra-ui/react"
import { Container } from "next/app"
import ChatDisplay from "./ChatDisplay"
import ChatInput from "./ChatInput"
import ChatSelection from "./ChatSelect"

export default function ChatDrawerFullPage() {
  const drawerbg = useColorModeValue("whitesmoke", "gray.900")

  const ChatContainer = <Container />
  const ChatSelectionContainer = <Flex />
  const ChatJoinedRoomsContainer = <Flex />
  const ChatDisplayContainer = <Flex />
  const ChatUserListContainer = <Flex />
  const ChatInputContainer = <Flex />

  return (
    <Flex bg={drawerbg}>
      <ChatSelection />

      <ChatDisplay />

      <ChatInput />
    </Flex>
  )
}
